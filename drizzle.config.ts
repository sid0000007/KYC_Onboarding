// // drizzle.config.ts
// import type { Config } from 'drizzle-kit';

// export default {
//     schema: './src/db/schema.ts',
//     out: './drizzle/migrations',
//     driver: 'turso',
//     dbCredentials: {
//         url: process.env.TURSO_DATABASE_URL!,
//         authToken: process.env.TURSO_DATABASE_AUTH_TOKEN!,
//     },
// } satisfies Config;

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

