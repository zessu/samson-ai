import { Worker } from "bullmq";
import { gte, lt, and, arrayOverlaps, eq, inArray } from "drizzle-orm";
import IORedis from "ioredis";
const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

import { workoutSettings, workoutSchedule } from "@db/schema/index";
import { db } from "@db/index";
import { initMailQueue } from "@/lib/index";
import { nanoid } from "nanoid";

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
  const { mq } = initMailQueue();
  const workoutMailWorker = new Worker(
    "workoutMailQueue",
    async () => {
      //TODO: reconcile user timezone with server timezone to get accurate data
      const dayofTheWeek = (dayjs().day() as keyof typeof weekMap) ?? 0;
      const mappedDay = weekMap[dayofTheWeek];
      const hour = dayjs().hour(); // e.g 16
      const weekOfTheYear = dayjs().week();
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

      // We dont need to error, theres no one to send an email to right now so no point retrying
      if (!result[0]) return { status: "success" };

      const remainder = weekOfTheYear % 4;
      const weekprefix = remainder === 0 ? 4 : remainder;

      const userIdsToSearch = result.map((res) => res.userId);

      console.log(
        `Looking for schedules: week${weekprefix} ${mappedDay}, ${startTime} ${endTime}`
      );

      if (userIdsToSearch.length > 0) {
        const dbResult = await db
          .select({
            userId: workoutSchedule.userId,
            workout: workoutSchedule.workout,
            caution: workoutSchedule.caution,
            calories: workoutSchedule.calories,
          })
          .from(workoutSchedule)
          .where(
            and(
              eq(workoutSchedule.week, `week${weekprefix}`),
              eq(workoutSchedule.day, mappedDay),
              inArray(workoutSchedule.userId, userIdsToSearch)
            )
          );

        if (dbResult.length > 0) {
          dbResult.map((item) => {
            const jobId = nanoid();
            mq.add(`sendMail:${jobId}`, item);
          });
        }

        return { status: "success" };
      }
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
