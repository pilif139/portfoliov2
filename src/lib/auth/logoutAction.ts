"use server"

import { deleteSessionTokenCookie } from "@/lib/auth/cookies"
import { invalidateSession } from "@/lib/auth/session"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function logout(sessionId: string) {
    deleteSessionTokenCookie()
    await invalidateSession(sessionId)
    revalidatePath("/")
    redirect("/")
}
