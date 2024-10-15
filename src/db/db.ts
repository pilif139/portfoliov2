import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;

if(!DATABASE_URL){
  throw new Error('DATABASE_URL is not set in the .env file');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
const db = drizzle(pool);

export default db;