import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/generate", (c) => {
  return c.text("generated your workout routine");
});

export default app;
