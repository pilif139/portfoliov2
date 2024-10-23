import { text, integer, pgTable, varchar, pgEnum, uniqueIndex} from "drizzle-orm/pg-core"
import {InferSelectModel} from "drizzle-orm";

export const projectTable = pgTable("projects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
});

export const contentType = pgEnum("content_type", ["p", "h1", "h2", "h3", "h4", "image", "video", "file", "link", "tag"]);

export const project_content_blocksTable = pgTable("project_content_blocks", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    project_id: integer().notNull().references(()=>projectTable.id),
    type: contentType().notNull(),
    content: text().notNull(),
    position: integer().notNull(),
}, 
// constraint that ensure that the combination of project_id and position is unique
(table) => {
    return {
        uniqueProjectPosition: uniqueIndex("unique_project_position").on(table.project_id, table.position)
    };
});

export type Project = InferSelectModel<typeof projectTable>;
export type ProjectContentBlock = InferSelectModel<typeof project_content_blocksTable>;