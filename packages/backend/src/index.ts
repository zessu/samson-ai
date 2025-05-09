import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { auth } from "../auth";
import { onBoardingSchema } from "shared";

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

app.post("/createProfile", zValidator("json", onBoardingSchema), async (c) => {
  const validated = c.req.valid("json");
  const user = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  if (!user)
    return c.text("You are not authorised to perform that action", 401);
  return c.text("generated your workout routine");
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default app;
