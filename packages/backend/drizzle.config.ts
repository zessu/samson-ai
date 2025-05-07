import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "auth-schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
