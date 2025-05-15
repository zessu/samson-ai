import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`);

export const workoutMailQueue = () => {
  return new Queue("workoutMailQueue", {
    connection,
  }).upsertJobScheduler("send-workout-emails", { every: 3000 });
};
