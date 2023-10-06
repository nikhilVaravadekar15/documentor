import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
    path: ".env",
});


export default {
    schema: "./src/database/schema.ts",
    driver: "pg",
    out: "./drizzle",
    dbCredentials: {
        connectionString: process.env.NEON_DATABASE_URL!
    }
} satisfies Config;
