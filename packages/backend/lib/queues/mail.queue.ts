import { Queue } from "bullmq";
import IORedis from "ioredis";
import { mailSend } from "@lib/index";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`);

export const mailQueue = () => {
  return new Queue<mailSend>("sendMail", {
    connection,
  });
};
