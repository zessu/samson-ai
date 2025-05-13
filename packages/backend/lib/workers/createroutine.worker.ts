import { Worker, Job } from "bullmq";
import IORedis from "ioredis";

import { routineType } from "@lib/index";
import { queryAgent } from "@lib/agent";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`, {
  maxRetriesPerRequest: null,
});

export const createRoutineWorker = () => {
  const createRoutineWorker = new Worker<routineType>(
    "generateRoutine",
    async (job: Job<routineType>) => {
      const res = await queryAgent(job.data);
      console.log(res);
      return { status: "success" };
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
