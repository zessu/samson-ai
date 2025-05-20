import { Queue } from "bullmq";
import IORedis from "ioredis";
import { routineType } from "@lib/index";

const connection = new IORedis(`${Bun.env.REDIS_HOST}`);

export const connectRoutineQueue = () => {
  return new Queue<routineType>("generateRoutine", {
    connection,
  });
};
