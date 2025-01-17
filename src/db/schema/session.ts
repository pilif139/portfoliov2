import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { userTable } from "@/db/schema/users"
import { InferSelectModel } from "drizzle-orm"

// session table from lucia-auth docs
export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
})

export type Session = InferSelectModel<typeof sessionTable>
