import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'turso',
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL!,
        authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!,
    },
});

