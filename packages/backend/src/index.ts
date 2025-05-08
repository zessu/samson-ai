import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "../auth";
import { Human } from "shared";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: process.env.LOCALDOMAIN as string,
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/createProfile", async (c) => {
  const userData = await c.req.json();
  console.log(userData);
  return c.text("generated your workout routine");
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default app;
