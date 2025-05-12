import { Queue } from "bullmq";
import IORedis from "ioredis";
import { z } from "zod";
import { onBoardingSchema } from "shared";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`);
const routineInput = onBoardingSchema.omit({ notifications: true });
type routineType = z.infer<typeof routineInput>;

export const connectRoutineQueue = () => {
  return new Queue<routineType & { id: string }>("generateRoutine", {
    connection,
  });
};
