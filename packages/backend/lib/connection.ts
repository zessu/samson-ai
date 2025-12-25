import IORedis from "ioredis";

const connection = new IORedis(
  `rediss://default:${Bun.env.REDIS_SECRET}@harmless-dragon-52262.upstash.io:6379`,
  {
    maxRetriesPerRequest: null,
  },
);

connection.on("connect", () => {
  console.log("IORedis connected to Redis");
});
connection.on("error", (err) => {
  console.error("IORedis Redis error:", err);
});
connection.on("reconnecting", () => {
  console.log("IORedis reconnecting to Redis");
});
connection.on("end", () => {
  console.log("IORedis terminating redis connection");
});

export { connection };
