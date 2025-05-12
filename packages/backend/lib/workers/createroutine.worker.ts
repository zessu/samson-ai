import { Worker } from "bullmq";
import IORedis from "ioredis";
const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`, {
  maxRetriesPerRequest: null,
});

export const createRoutineWorker = () => {
  const createRoutineWorker = new Worker(
    "generateRoutine",
    async (job) => {
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
