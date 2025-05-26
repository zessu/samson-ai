import { RedisClient } from "bun";
import IORedis from "ioredis";

export const connection = new IORedis(
  `${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`,
  {
    maxRetriesPerRequest: 3,
    socketTimeout: 30000,
  }
);
