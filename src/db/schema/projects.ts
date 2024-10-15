import { text, integer, pgTable, varchar} from "drizzle-orm/pg-core"

export const project = pgTable("projects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),

});

export const projectLinks = pgTable("project_links", {
    projectId: integer().references(()=> project.id),
    url: varchar({ length: 600 }).notNull(),
});