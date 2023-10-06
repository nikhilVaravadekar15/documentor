import * as schema from "@/database/schema"
import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';

// create the connection
neonConfig.fetchConnectionCache = true;

export const sql = neon(process.env.NEON_DATABASE_URL!);
export const db = drizzle(
    sql,
    { schema: schema }
);
