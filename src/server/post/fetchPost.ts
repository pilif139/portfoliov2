import db from "@/db/db"
import { post_content_blocksTable, postsTable } from "@/db/schema/posts"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

export default async function fetchPost(id: number) {
    const [post] = await db.select().from(postsTable).where(eq(postsTable.id, id)).execute()
    if (!post) {
        notFound()
    }
    const contents = await db.select().from(post_content_blocksTable).where(eq(post_content_blocksTable.post_id, id)).execute()
    return { post, contents }
}
