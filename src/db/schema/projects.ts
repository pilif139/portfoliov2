import { text, integer, pgTable, varchar} from "drizzle-orm/pg-core"
import {InferSelectModel} from "drizzle-orm";

export const projectTable = pgTable("projects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
});

export const projectLinksTable = pgTable("project_links", {
    projectId: integer().references(()=> projectTable.id),
    url: varchar({ length: 600 }).notNull(),
});

export type Project = InferSelectModel<typeof projectTable>;