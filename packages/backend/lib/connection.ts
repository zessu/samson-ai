import IORedis from "ioredis";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`, {
  maxRetriesPerRequest: null,
  socketTimeout: 30000,
});

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
