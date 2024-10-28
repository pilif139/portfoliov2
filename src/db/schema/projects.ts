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
    // position starts from 1 bcs drag and drop library interprets 0 as false and disables the drag and drop feature so whenever we are changing the position of a content block we must increment it by 1
    position: integer().notNull(),
}, 
(table) => {
    return {
        // each project can have only one content block at a specific position so there cannot be two content blocks with the same position in the same project
        uniqueProjectPosition: uniqueIndex("unique_project_position").on(table.project_id, table.position),
        compositePrimaryKey: primaryKey({ columns: [table.project_id, table.position]})
    };
});

export type Project = InferSelectModel<typeof projectTable>;
export type ProjectContentBlock = InferSelectModel<typeof project_content_blocksTable>;