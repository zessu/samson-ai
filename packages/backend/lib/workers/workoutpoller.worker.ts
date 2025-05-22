import { Worker } from "bullmq";
import { sql, and, arrayOverlaps, eq, inArray } from "drizzle-orm";

const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(weekOfYear);

import { workoutSettings, workoutSchedule } from "@db/schema/index";
import { db } from "@db/index";
import { initMailQueue } from "@/lib/index";
import { nanoid } from "nanoid";
import { connection } from "@/lib/connection";

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
    async () => {
      const { mq } = initMailQueue();
      const serverTimeOffset = dayjs().utcOffset();
      console.log(`server utc timezone offset ${serverTimeOffset}`);
      const dayofTheWeek = (dayjs().day() as keyof typeof weekMap) ?? 0;
      const mappedDay = weekMap[dayofTheWeek];
      const hour = dayjs().hour(); // e.g 16
      const weekOfTheYear = dayjs().week();
      const startTime = `${hour.toString().padStart(2, "0")}:00:00`;
      const endTime = `${(hour + 1).toString().padStart(2, "0")}:00:00`;

      console.log(
        `startTime ${startTime} endTime ${endTime} serverOffset ${serverTimeOffset / 60}`
      );

      const result = await db
        .select()
        .from(workoutSettings)
        .where(
          and(
            arrayOverlaps(workoutSettings.weekdays, [mappedDay]),
            sql`
            (
              ${workoutSettings.workoutTime} + 
              INTERVAL '1 HOUR' * (
                ${workoutSettings.userTimezoneOffset} - (${sql.param(serverTimeOffset / 60)})
              )
            )::TIME
            BETWEEN
              (${sql.param(startTime)}::TIME - INTERVAL '2 MINUTES')
              AND
              (${sql.param(endTime)}::TIME + INTERVAL '2 MINUTES')
          `
          )
        );

      // We dont need to error, theres no one to send an email to right now so no point retrying

      if (!result[0]) {
        console.log("No users to send email to right now ...");
        return { status: "success" };
      }

      const remainder = weekOfTheYear % 4;
      const weekprefix = remainder === 0 ? 4 : remainder;

      const userIdsToSearch = result.map((res) => res.userId);

      console.log(userIdsToSearch);

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

        if (dbResult.length && dbResult.length > 0) {
          try {
            const promisesMap = dbResult.map(async (item) => {
              const jobId = nanoid();
              console.log(`sendMail:${jobId}`);
              await mq.add(`sendMail:${jobId}`, {
                ...item,
                emailType: "workout",
              });
              return;
            });

            await Promise.all(promisesMap);
          } catch (error) {
            console.log(`Error sending emails to the queue : ${error}`);
          }
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
