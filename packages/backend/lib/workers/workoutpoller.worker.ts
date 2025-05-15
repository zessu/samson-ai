import { Worker, Job } from "bullmq";
import { gte, lt, and, arrayOverlaps } from "drizzle-orm";
import IORedis from "ioredis";
const dayjs = require("dayjs");

import { workoutSettings } from "@db/schema/index";
import { db } from "@db/index";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`, {
  maxRetriesPerRequest: null,
});

const weekMap = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
} as const;

export const workoutMailWorker = () => {
  const workoutMailWorker = new Worker(
    "workoutMailQueue",
    async (job) => {
      const dayofTheWeek = (dayjs().day() as keyof typeof weekMap) ?? 0;
      const mappedDay = weekMap[dayofTheWeek];
      const hour = dayjs().hour(); // e.g 16
      const startTime = `${hour.toString().padStart(2, "0")}:00:00`;
      const endTime = `${(hour + 1).toString().padStart(2, "0")}:00:00`;
      const result = await db
        .select()
        .from(workoutSettings)
        .where(
          and(
            gte(workoutSettings.workoutTime, startTime),
            lt(workoutSettings.workoutTime, endTime),
            arrayOverlaps(workoutSettings.weekdays, [mappedDay])
          )
        );

      if (!result[0])
        throw new Error("No users scheduled a workout at this time");

      console.log(result);
    },
    { connection }
  );

  workoutMailWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
  });

  workoutMailWorker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err.message);
  });

  return workoutMailWorker;
};
