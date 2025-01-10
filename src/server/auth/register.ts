"use server"

import { userTable } from "@/db/schema/users"
import bcrypt from "bcrypt"
import db from "@/db/db"
import { FormState, RegisterSchema } from "./registerTypes"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { createSession, generateSessionToken } from "@/lib/auth/session"
import { setSessionTokenCookie } from "@/lib/auth/cookies"
import { revalidatePath } from "next/cache"

export default async function register(state: FormState, formData: FormData): Promise<FormState> {
    const validateFields = RegisterSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if (!validateFields.success) {
        return { errors: validateFields.error.flatten().fieldErrors }
    }

    const { username, email, password } = validateFields.data

    const existingEmail = await db.select().from(userTable).where(eq(userTable.email, email)).execute()
    if (existingEmail.length > 0) {
        return { errors: { email: ["Email already exists"] } }
    }
    const existingUsername = await db.select().from(userTable).where(eq(userTable.username, username)).execute()
    if (existingUsername.length > 0) {
        return { errors: { username: ["Username already exists"] } }
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        // inserting into database
        const [{ id }] = await db
            .insert(userTable)
            .values({
                username,
                email,
                password: hashedPassword,
            })
            .returning({ id: userTable.id })
            .execute()

        // cookie handling
        const token = generateSessionToken()
        const session = await createSession(token, id)
        setSessionTokenCookie(token, session.expiresAt)
    } catch (error) {
        throw new Error("Failed to insert user into databse - " + error)
    }

    revalidatePath("/", "layout")
    redirect("/")
}
