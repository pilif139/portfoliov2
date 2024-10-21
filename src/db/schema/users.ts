import {pgEnum, pgTable, timestamp, varchar, serial} from "drizzle-orm/pg-core";
import {InferSelectModel} from "drizzle-orm";

export const role = pgEnum("role", ["user", "admin"]);

export const userTable = pgTable("user", {
    id: serial("id").primaryKey().unique(),
    username: varchar({ length: 255 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
    role: role().notNull().default("user"),
});

export type User = InferSelectModel<typeof userTable>;