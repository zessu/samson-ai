import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: ["./auth-schema.ts", "./src/db/schema/index.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
