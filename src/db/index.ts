//import { drizzle } from 'drizzle-orm/libsql';
import { drizzle } from 'drizzle-orm/libsql/web';
import { createClient } from '@libsql/client';
import { config } from 'dotenv';

config();
// console.log(process.env.NEXT_PUBLIC_TURSO_DATABASE_URL);
// console.log(process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN);

const client = createClient({
    url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL!,
    authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!,

});
export const db = drizzle({ connection: {
    url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL!, 
    authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!
  }});

//export const db = drizzle(client);