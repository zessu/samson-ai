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

export const workoutMailWorker = () => {
  const workoutMailWorker = new Worker(
    "workoutMailQueue",
    async (job) => {
      console.log("recevied a new job");
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
