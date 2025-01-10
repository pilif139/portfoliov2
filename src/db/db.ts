import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

class Database {
    private static instance: Database
    public db: ReturnType<typeof drizzle>

    private constructor() {
        const POSTGRES_URL = process.env.POSTGRES_URL

        if (!POSTGRES_URL) {
            throw new Error("POSTGRES_URL is not set in the .env file")
        }

        const pool = new Pool({
            connectionString: process.env.POSTGRES_URL!,
        })
        this.db = drizzle(pool)
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const db = Database.getInstance().db
export default db
