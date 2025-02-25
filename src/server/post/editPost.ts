"use server"

import { getCurrentSession } from "@/lib/auth/session"
import db from "@/db/db"
import { postsTable } from "@/db/schema/posts"
import { eq } from "drizzle-orm"
import { titleSchema, descriptionSchema } from "@/server/post/postTypes"

export default async function editPost(id: number, title: string, description: string) {
    const { user, session } = await getCurrentSession()
    if (!user || !session || user.role !== "admin") {
        throw new Error("You don't have the required permissions to edit a post")
    }
    const titleParse = titleSchema.safeParse(title)
    const descriptionParse = descriptionSchema.safeParse(description)
    if (!titleParse.success || !descriptionParse.success) {
        return {
            errors: {
                ...(titleParse.error && { title: titleParse.error.flatten().formErrors }),
                ...(descriptionParse.error && { description: descriptionParse.error.flatten().formErrors }),
            },
        }
    }

    await db.update(postsTable).set({ title, description }).where(eq(postsTable.id, id)).execute()
    return { errors: null }
}
