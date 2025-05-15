import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`);

export const mailQueue = () => {
  return new Queue("mailQueue", {
    connection,
  });
};
