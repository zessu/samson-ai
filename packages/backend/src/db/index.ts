import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(Bun.env.DATABASE_URL as string);
