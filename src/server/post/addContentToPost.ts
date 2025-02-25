"use server"

import { put } from "@vercel/blob"
import db from "@/db/db"
import { post_content_blocksTable } from "@/db/schema/posts"
import { getCurrentSession } from "@/lib/auth/session"

export default async function addContentToPost(post_id: number, formData: FormData) {
    const { user, session } = await getCurrentSession()
    if (!user || !session || user.role !== "admin") {
        throw new Error("You don't have the required permissions to add content to a post")
    }

    const type = formData.get("type") as "file" | "image" | "video" | "p" | "link" | "h1" | "h2" | "h3" | "h4" | "tag"
    const position = parseInt(formData.get("position") as string)
    const contentValue = formData.get("content") as string | File
    const isFile = contentValue instanceof File
    if (isFile) {
        const image = await put(contentValue.name, contentValue, {
            access: "public",
        })
        await db
            .insert(post_content_blocksTable)
            .values({
                post_id,
                type: type,
                content: image.url,
                position: position,
            })
            .execute()
    } else {
        await db
            .insert(post_content_blocksTable)
            .values({
                post_id,
                type: type,
                content: contentValue,
                position: position,
            })
            .execute()
    }
}
