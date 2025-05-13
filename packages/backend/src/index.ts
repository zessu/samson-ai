import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

import { onBoardingSchema } from "shared";
import { auth } from "@/auth";
import { user as User } from "@/auth-schema";
import { db } from "@db/index";
import {
  workoutSettings,
  workoutScheduleInsertSchema,
  workoutScheduleUpdateSchema,
} from "@db/schema/index";
import { userUpdateSchema } from "@/auth-schema";
import { connectRoutineQueue, createRoutineWorker } from "@lib/index";

const app = new Hono();

const queue = connectRoutineQueue();
createRoutineWorker();

app.use(
  "*",
  cors({
    origin: Bun.env.LOCALDOMAIN as string,
    credentials: true,
  })
);

app.post("/createProfile", zValidator("json", onBoardingSchema), async (c) => {
  const validated = c.req.valid("json");
  const user = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  if (!user)
    return c.text("You are not authorised to perform that action", 401);

  const userid = user.user.id;

  const userData = {
    gender: validated.gender,
    age: validated.age,
    weight: validated.weight,
    fitnessLevel: validated.fitnessLevel,
    goals: validated.goals.join(","),
    equipment: validated.equipment.join(","),
    notifications: "sms",
  };

  const parsedUserData = userUpdateSchema.safeParse(userData);

  if (!parsedUserData.success) {
    return c.json(
      { error: "Validation failed", issues: parsedUserData.error.format() },
      400
    );
  }

  const userResult = await db
    .update(User)
    .set(parsedUserData.data)
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
    id: nanoid(),
  };

  const parsedWorkoutData =
    await workoutScheduleInsertSchema.safeParse(schedule);

  if (!parsedWorkoutData.success) {
    return c.json(
      { error: "Validation failed", issues: parsedWorkoutData.error.format() },
      400
    );
  }

  const workoutResult = await db
    .insert(workoutSettings)
    .values(parsedWorkoutData.data)
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

  const { notifications, ...rest } = validated;
  queue.add("", { ...rest, id: userid });

  return c.json(
    "Generating your workout routine. We will be done in a short time"
  );
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.onError((err, c) => {
  if (err.message.startsWith("Validation error")) {
    return c.json({ error: "Validation Error" }, 400);
  }
  return c.json({ error: "Internal Server Error" }, 500);
});

export default app;
