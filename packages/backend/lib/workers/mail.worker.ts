import { z } from "zod";
import { Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { nanoid } from "nanoid";

import { workoutScheduleInsertSchema, workoutSchedule } from "@db/schema/index";
import { db } from "@db/index";
import { queryAgent } from "@lib/agent";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`, {
  maxRetriesPerRequest: null,
});

export const mailWorker = () => {
  const mailWorker = new Worker(
    "mailWorker",
    async (job) => {
      const dayofTheWeek = dayjs.day();
      console.log(`today is ${dayofTheWeek}`);
    },
    { connection }
  );

  mailWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
  });

  mailWorker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed with error:`, err.message);
  });

  return mailWorker;
};
