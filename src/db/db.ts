import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from "pg";

const POSTGRES_URL = process.env.POSTGRES_URL;

if(!POSTGRES_URL){
  throw new Error('POSTGRES_URL is not set in the .env file');
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL!,
});
const db = drizzle(pool);

export default db;