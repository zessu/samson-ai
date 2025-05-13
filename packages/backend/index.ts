import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { eq } from "drizzle-orm";

import { onBoardingSchema } from "shared";
import { auth } from "@/auth";
import { user as User } from "@/auth-schema";
import { db } from "@db/index";
import { workoutSettings, workoutScheduleInsertSchema } from "@db/schema/index";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: Bun.env.LOCALDOMAIN as string,
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/createProfile", zValidator("json", onBoardingSchema), async (c) => {
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
      404
    );
  }

  const schedule = {
    weekdays: validated.weekdays,
    workoutTime: validated.time,
    workoutDuration: validated.duration,
    offset: validated.offset,
    userId: userResult[0].userid,
  };

  const parsed = await workoutScheduleInsertSchema.parse(schedule);
  const workoutResult = await db
    .insert(workoutSettings)
    .values(parsed)
    .returning({ id: workoutSettings.id });

  if (!workoutResult || workoutResult.length === 0) {
    return c.json(
      {
        error:
          "We could not create a workout schedule for you. Please try again in a bit",
      },
      404
    );
  }

  return c.json("generated your workout routine");
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.onError((err, c) => {
  if (err.message.startsWith("Validation error")) {
    return c.json({ error: "Validation Error" }, 400);
  }
  return c.json({ error: "Internal Server Error" }, 500);
});

export default app;
