"use server"

import { postsTable } from "@/db/schema/posts"
import db from "@/db/db"
import { getCurrentSession } from "@/lib/auth/session"
import { z } from "zod"
import { eq } from "drizzle-orm"

const titleSchema = z.string().min(3, "Title must be atleast 3 characters long").max(150, "Title must be at most 150 characters long")
const descriptionSchema = z
    .string()
    .min(7, "Description must be atleast 7 characters long")
    .max(250, "Description must be at most 250 characters long")

export default async function createPost(title: string, description: string) {
    const { user, session } = await getCurrentSession()
    if (!user || !session || user.role !== "admin") {
        return {
            errors: {
                user: "Current user either isn't logged in or doesn't have the required permissions",
            },
        }
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
