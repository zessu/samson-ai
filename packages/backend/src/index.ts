import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { onBoardingSchema } from "shared";
import { user as User } from "@/auth-schema";
import { db } from "@/src/db/index";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: Bun.env.LOCALDOMAIN as string,
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/createProfile", zValidator("json", onBoardingSchema), async (c) => {
  const validated = c.req.valid("json");
  console.log(validated);
  const user = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  if (!user)
    return c.text("You are not authorised to perform that action", 401);
  const userid = user.user.id;
  const res = db.update(User).set({}).where(eq(User.id, userid)).returning();
  return c.text("generated your workout routine");
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.onError((err, c) => {
  if (err.message.startsWith("Validation error")) {
    return c.json({ error: "Validation Error" }, 400);
  }
  return c.json({ error: "Internal Server Error" }, 500);
});

export default app;
