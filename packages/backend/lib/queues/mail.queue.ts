import { Queue } from "bullmq";
import IORedis from "ioredis";
import { workOutEmail, introEmail } from "@lib/index";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`);

export const mailQueue = () => {
  return new Queue<workOutEmail | introEmail>("sendMail", {
    connection,
  });
};
