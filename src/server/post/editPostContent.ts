"use server"

import { getCurrentSession } from "@/lib/auth/session"
import db from "@/db/db"
import { del, put } from "@vercel/blob"
import { post_content_blocksTable } from "@/db/schema/posts"
import { eq, and } from "drizzle-orm"

export default async function editPostContent(id: number, formData: FormData) {
    const { user, session } = await getCurrentSession()
    if (!user || !session || user.role !== "admin") {
        throw new Error("You don't have the required permissions to edit a post")
    }
    const type = formData.get("type") as "file" | "image" | "video" | "p" | "link" | "h1" | "h2" | "h3" | "h4" | "tag"
    const position = parseInt(formData.get("position") as string)
    const contentValue = formData.get("content") as string | File
    const previousFileUrl = formData.get("previousFileUrl") as string | null
    const isFile = contentValue instanceof File
    if (isFile) {
        if (!previousFileUrl) {
            throw new Error("You must provide the previous file url to edit a file")
        }
        await del(previousFileUrl)
        const image = await put(contentValue.name, contentValue, {
            access: "public",
        })
        await db
            .update(post_content_blocksTable)
            .set({
                type: type,
                content: image.url,
                position: position,
            })
            .where(and(eq(post_content_blocksTable.post_id, id), eq(post_content_blocksTable.position, position)))
            .execute()
    } else {
        await db
            .update(post_content_blocksTable)
            .set({
                type: type,
                content: contentValue,
                position: position,
            })
            .where(and(eq(post_content_blocksTable.post_id, id), eq(post_content_blocksTable.position, position)))
            .execute()
    }
}
