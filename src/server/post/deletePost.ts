"use server"

import db from "@/db/db"
import { post_content_blocksTable, postsTable } from "@/db/schema/posts"
import { del } from "@vercel/blob"
import { eq, or } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export default async function deletePost(postId: number) {
    await db.transaction(async (tx) => {
        const [post] = await tx.select().from(postsTable).where(eq(postsTable.id, postId)).execute()
        if (!post) {
            return { error: "Post not found" }
        }
        const filesBlocks = await tx
            .select()
            .from(post_content_blocksTable)
            .where(
                or(
                    eq(post_content_blocksTable.type, "image"),
                    eq(post_content_blocksTable.type, "file"),
                    eq(post_content_blocksTable.type, "video")
                )
            )
            .execute()
        for (const block of filesBlocks) {
            try {
                await del(block.content)
            } catch (e) {
                console.error(e)
                return {
                    error: "Error deleting files from vercel blob storage " + e,
                }
            }
        }
        await tx.delete(post_content_blocksTable).where(eq(post_content_blocksTable.post_id, postId)).execute()
        await tx.delete(postsTable).where(eq(postsTable.id, postId)).execute()
    })
    revalidatePath("/admin/posts")
}
