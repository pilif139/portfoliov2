"use server"

import { getCurrentSession } from "@/lib/auth/session"
import db from "@/db/db"
import { del, put } from "@vercel/blob"
import { post_content_blocksTable } from "@/db/schema/posts"
import { eq, and } from "drizzle-orm"
import { contentType } from "./postTypes"

export default async function editPostContent(post_id: number, formData: FormData) {
    const { user, session } = await getCurrentSession()
    if (!user || !session || user.role !== "admin") {
        throw new Error("You don't have the required permissions to edit a post")
    }
    const type = formData.get("type") as contentType
    const position = parseInt(formData.get("position") as string)
    const contentValue = formData.get("content") as string | File
    const previousFileUrl = formData.get("previousFileUrl") as string | null
    const isFile = contentValue instanceof File

    let value = isFile ? "" : contentValue
    if (isFile) {
        if (!previousFileUrl) {
            throw new Error("You must provide the previous file url to edit a file")
        }
        await del(previousFileUrl)
        const image = await put(contentValue.name, contentValue, {
            access: "public",
        })
        value = image.url
    }

    const positionExists = await db
        .select({ position: post_content_blocksTable.position })
        .from(post_content_blocksTable)
        .where(and(eq(post_content_blocksTable.post_id, post_id), eq(post_content_blocksTable.position, position)))
        .execute()

    if (positionExists && positionExists.length > 0) {
        await db
            .update(post_content_blocksTable)
            .set({
                type: type,
                content: value,
                position: position,
            })
            .where(and(eq(post_content_blocksTable.post_id, post_id), eq(post_content_blocksTable.position, position)))
            .execute()
    } else {
        await db.insert(post_content_blocksTable).values({
            post_id: post_id,
            type: type,
            content: value,
            position: position,
        })
    }
}
