import { join } from "path";
import { type ServerWebSocket } from "bun";
import { Hono } from "hono";
import { createBunWebSocket, serveStatic } from "hono/bun";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

import { onBoardingSchema } from "shared";
import { auth } from "@/auth";
import { user as User } from "@/auth-schema";
import { db } from "@db/index";
import { workoutSettings, workoutSettingsInsertSchema } from "@db/schema/index";
import { initQueues } from "@/lib/index";

type webSocketData = { userid: string };
export const clients = new Map<string, ServerWebSocket<webSocketData>>();

const { upgradeWebSocket, websocket } =
  createBunWebSocket<ServerWebSocket<webSocketData>>();

const app = new Hono();

const { routineQueue: createRoutineQueue } = initQueues();

app.use(
  "*",
  cors({ origin: import.meta.env.LOCALDOMAIN as string, credentials: true }),
);

app.post(
  "/api/createProfile",
  zValidator("json", onBoardingSchema),
  async (c) => {
    const validated = c.req.valid("json");
    const user = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!user)
      return c.text("You are not authorised to perform that action", 401);

    const userid = user.user.id;
    const userResult = await db
      .update(User)
      .set({
        gender: validated.gender,
        age: validated.age,
        weight: validated.weight,
        fitnessLevel: validated.fitnessLevel,
        goals: validated.goals.join(","),
        equipment: validated.equipment.join(","),
        notifications: "sms",
      })
      .where(eq(User.id, userid))
      .returning({ userid: User.id });

    if (!userResult || userResult.length === 0) {
      return c.json(
        { error: "We could not make the user request, please try again later" },
        404,
      );
    }

    const userWorkoutSettings = {
      id: nanoid(),
      weekdays: validated.weekdays,
      workoutTime: validated.time,
      workoutDuration: validated.duration,
      userId: userResult[0].userid,
      userTimezoneOffset: validated.offset,
    };

    const parsedWorkoutSettings = workoutSettingsInsertSchema.parse(userWorkoutSettings);

    const workoutResult = await db
      .insert(workoutSettings)
      .values(userWorkoutSettings)
      .returning({ id: workoutSettings.id });

    if (!workoutResult || workoutResult.length === 0) {
      return c.json(
        {
          error:
            "We could not create a workout schedule for you. Please try again in a bit",
        },
        404,
      );
    }

    const jobId = nanoid();

    await createRoutineQueue.add(`create-routine:${jobId}`, {
      ...validated,
      id: userid,
    });

    return c.json("generated your workout routine");
  },
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.get(
  "/ws",
  upgradeWebSocket((c) => {
    const url = new URL(c.req.url);
    const userid = url.searchParams.get("userId");
    if (!userid) return {};
    return {
      onOpen: (_, ws) => {
        console.log("new connection opened");
        const wss = ws.raw as ServerWebSocket<webSocketData>;
        clients.set(userid, wss);
      },
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send("Hello from server!");
      },
      onClose: (_, ws) => {
        ws.raw?.close();
        clients.delete(userid);
        console.log("Connection closed");
      },
      onError: () => console.log("Websocket Error"),
    };
  }),
);

const distDir = join(import.meta.dir, "../../frontend/dist");

app.use("/*", serveStatic({ root: distDir }));
app.use(
  "/*",
  serveStatic({
    root: distDir,
    path: "index.html",
  }),
);

Bun.serve({
  fetch: app.fetch,
  port: 3000,
  websocket,
  idleTimeout: 120,
});

console.log("✅✅✅ Started Backend Server");
