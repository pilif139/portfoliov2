import { integer, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

const role = pgEnum("role", ["user", "admin"]);

export const user = pgTable("users", {
    uid: integer().primaryKey().unique(),
    username: varchar({ length: 255 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
    role: role().notNull().default("user"),
});

