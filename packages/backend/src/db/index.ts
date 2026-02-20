import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from '@db/schema/index';

const pool = new Pool({
  connectionString: Bun.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });
