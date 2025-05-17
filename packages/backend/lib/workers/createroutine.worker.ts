import { z } from "zod";
import { Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { nanoid } from "nanoid";

import { clients } from "@/src/index";
import { workoutScheduleInsertSchema, workoutSchedule } from "@db/schema/index";
import { db } from "@db/index";
import { routineType } from "@lib/index";
import { queryAgent } from "@lib/agent";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`, {
  maxRetriesPerRequest: null,
});

const workoutDaySchema = z.object({
  workout: z.string(),
  calories: z.number(),
  caution: z.string(),
});

const weekSchema = z.object({
  monday: workoutDaySchema,
  tuesday: workoutDaySchema,
  wednesday: workoutDaySchema,
  thursday: workoutDaySchema,
  friday: workoutDaySchema,
  saturday: workoutDaySchema,
  sunday: workoutDaySchema,
});

const inputSchema = z.object({
  data: z.object({
    userId: z.string(),
    week1: weekSchema,
    week2: weekSchema,
    week3: weekSchema,
    week4: weekSchema,
  }),
});

export const createRoutineWorker = () => {
  const createRoutineWorker = new Worker<routineType>(
    "generateRoutine",
    async (job: Job<routineType>) => {
      try {
        const agentResponse = await queryAgent(job.data);
        const agentResponseObject = await agentResponse.json();
        // TODO: check if the job had already been processed, reject if so
        // TODO: make sure all operations are ATOMIC in nature

        // Extract and clean the JSON string from the response
        const jsonString = agentResponseObject.text
          .replace(/^```(json)?\n/, "") // Remove opening ```json or ```
          .replace(/\n```$/, "") // Remove closing ```
          .trim();

        // Parse the workout plan
        const workoutPlan = JSON.parse(jsonString);
        const parsed = inputSchema.safeParse(workoutPlan);

        if (!parsed.success) {
          console.error("Validation failed:", parsed.error);
          throw new Error("Invalid workout plan structure");
        }

        const extractedData = parsed.data.data;
        const userId = extractedData.userId;

        const output = [];

        // Process all 4 weeks
        for (let week = 1; week <= 4; week++) {
          const weekKey = `week${week}` as keyof typeof extractedData;
          const currentWeek = extractedData[weekKey] as Record<
            string,
            { workout: string; calories: number; caution: string }
          >;

          for (const day in currentWeek) {
            const currentDay = currentWeek[day];
            output.push({
              id: nanoid(),
              userId: userId,
              week: weekKey,
              day: day,
              workout: currentDay.workout,
              calories: currentDay.calories,
              caution: currentDay.caution,
            });
          }
        }
        const validated = workoutScheduleInsertSchema.array().parse(output);
        await db.insert(workoutSchedule).values(validated).execute();

        clients
          .get(userId)
          ?.send(
            JSON.stringify({ type: "notifty", message: "workout generated" })
          );
        return { status: "success" };
      } catch (error) {
        console.error("Error in worker:", error);
        throw error; // This will trigger the 'failed' event
      }
    },
    {
      connection,
    }
  );

  createRoutineWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
  });

  createRoutineWorker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err.message);
  });

  return createRoutineWorker;
};
