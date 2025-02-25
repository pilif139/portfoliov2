"use server"

import { postsTable } from "@/db/schema/posts"
import db from "@/db/db"
import { getCurrentSession } from "@/lib/auth/session"
import { eq } from "drizzle-orm"
import { descriptionSchema, titleSchema } from "@/server/post/postTypes"

export default async function createPost(title: string, description: string) {
    const { user, session } = await getCurrentSession()
    if (!user || !session || user.role !== "admin") {
        throw new Error("You don't have the required permissions to create a post")
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

    const [existingPost] = await db.select().from(postsTable).where(eq(postsTable.title, title)).execute()
    if (existingPost) {
        return {
            errors: {
                title: ["Post with this title already exists"],
            },
        }
    }

    const [post] = await db.insert(postsTable).values({ title, description, author_id: user.id }).returning({ id: postsTable.id }).execute()
    return { post_id: post.id }
}
