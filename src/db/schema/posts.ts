import { text, integer, pgTable, varchar, uniqueIndex, primaryKey} from "drizzle-orm/pg-core"
import {InferSelectModel} from "drizzle-orm";
import { contentType } from "./projects";
import { userTable } from "./users";

export const postsTable = pgTable("posts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    author_id: integer().notNull().references(()=>userTable.id),
});

export const post_content_blocksTable = pgTable("post_content_blocks", {
    post_id: integer().notNull().references(()=>postsTable.id),
    type: contentType().notNull(),
    content: text().notNull(),
    position: integer().notNull(),
}, 
// constraint that ensure that the combination of project_id and position is unique
(table) => {
    return {
        uniquePostPosition: uniqueIndex("unique_post_position").on(table.post_id, table.position),
        compositePrimaryKey: primaryKey({ columns: [table.post_id, table.position]})
    };
});

export type Post = InferSelectModel<typeof postsTable>;
export type PostContentBlock = InferSelectModel<typeof post_content_blocksTable>;