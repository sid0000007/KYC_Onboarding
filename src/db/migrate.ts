// // src/db/migrate.ts
// import { drizzle } from 'drizzle-orm/libsql';
// import { config } from 'dotenv';
// import { migrate } from 'drizzle-orm/libsql/migrator';
// import { createClient } from '@libsql/client';

// config();

// const runMigrations = async () => {


//     if (!process.env.NEXT_PUBLIC_TURSO_DATABASE_URL || !process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN) {
//         throw new Error('Database credentials not found');
//     }

//     const client = createClient({
//         url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL,
//         authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN,
//     });

//     const db = drizzle(client);

//     console.log('Running migrations...');

//     await migrate(db, {
//         migrationsFolder: './drizzle/migrations',
//     });

//     console.log('Migrations completed!');
//     process.exit(0);
// };

// runMigrations().catch((err) => {
//     console.error('Migration failed!', err);
//     process.exit(1);
// });

// src/db/migrate.ts
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createClient } from '@libsql/client';
import { config } from 'dotenv';
config();

const runMigrations = async () => {


    if (!process.env.NEXT_PUBLIC_TURSO_DATABASE_URL || !process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN) {
        throw new Error('Database credentials not found');
    }

    const client = createClient({
        url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL,
        authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN,
    });
    const db = drizzle(client);

    console.log('Running migrations...');

    try {
        await migrate(db, {
            migrationsFolder: 'migrations'
        });
        console.log('Migrations completed!');
    } catch (error) {
        console.error('Migration failed!', error);
        throw error;
    } finally {
        await client.close();
    }
};

runMigrations()
    .then(() => {
        console.log('Migration process completed');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Migration process failed:', err);
        process.exit(1);
    });