import { text, integer, pgTable, varchar, pgEnum, uniqueIndex, primaryKey} from "drizzle-orm/pg-core"
import {InferSelectModel} from "drizzle-orm";
import { userTable } from "./users";

export const projectTable = pgTable("projects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    author_id: integer("author_id").notNull().references(()=>userTable.id),
});

export const contentType = pgEnum("content_type", ["p", "h1", "h2", "h3", "h4", "image", "video", "file", "link", "tag"]);

export const project_content_blocksTable = pgTable("project_content_blocks", {
    project_id: integer().notNull().references(()=>projectTable.id),
    type: contentType().notNull(),
    content: text().notNull(),
    position: integer().notNull(),
}, 
// constraint that ensure that the combination of project_id and position is unique
(table) => {
    return {
        uniqueProjectPosition: uniqueIndex("unique_project_position").on(table.project_id, table.position),
        compositePrimaryKey: primaryKey({ columns: [table.project_id, table.position]})
    };
});

export type Project = InferSelectModel<typeof projectTable>;
export type ProjectContentBlock = InferSelectModel<typeof project_content_blocksTable>;