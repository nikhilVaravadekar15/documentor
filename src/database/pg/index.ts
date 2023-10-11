import * as schema from '@/database/pg/schema'
import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';

// create the connection
neonConfig.fetchConnectionCache = true;

if (!process.env.NEON_DATABASE_URL!) {
    throw new Error("Database url not found")
}

export const sql = neon(process.env.NEON_DATABASE_URL!);
export const db = drizzle(
    sql,
    { schema: schema }
);
