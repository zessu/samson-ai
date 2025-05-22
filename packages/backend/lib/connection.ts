import IORedis from "ioredis";

export const connection = new IORedis(
  `${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`,
  {
    maxRetriesPerRequest: null,
  }
);
