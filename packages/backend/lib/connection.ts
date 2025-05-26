import IORedis from "ioredis";

const connection = new IORedis(`${Bun.env.REDIS_HOST}:${Bun.env.REDIS_PORT}`, {
  maxRetriesPerRequest: 3,
  socketTimeout: 30000,
});

connection.on("connect", () => {
  console.log("Client connected to Redis");
});
connection.on("error", (err) => {
  console.error("Redis Redis error:", err);
});
connection.on("reconnecting", () => {
  console.log("Reconnecting to Redis");
});
connection.on("end", () => {
  console.log("Redis connection closed");
});

export { connection };
