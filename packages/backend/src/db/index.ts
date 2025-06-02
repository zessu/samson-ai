import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: Bun.env.DATABASE_URL,
});

console.log(">>>>>>>>>>>>");
console.log(Bun.env.DATABASE_URL);
console.log(Bun.env.BETTER_AUTH_URL);
console.log(">>>>>>>>>>>>");

export const db = drizzle({ client: pool });

await db.execute(`
  CREATE TABLE IF NOT EXISTS food (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL, -- stored as cents
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log("done");
