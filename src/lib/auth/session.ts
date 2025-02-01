import "server-only"

import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding"
import { sha256 } from "@oslojs/crypto/sha2"
import { Session, sessionTable } from "@/db/schema/session"
import db from "@/db/db"
import { User, userTable } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import { cache } from "react"
import { cookies } from "next/headers"

export const getCurrentSession = cache(async () => {
    const token = (await cookies()).get("session")?.value ?? null
    if (token === null) {
        return { session: null, user: null }
    }
    return await validateSessionToken(token)
})

/**
 * Generates a random session token with cryptographically secure random generator.
 **/
export function generateSessionToken(): string {
    const bytes = new Uint8Array(20)
    crypto.getRandomValues(bytes)
    return encodeBase32LowerCaseNoPadding(bytes)
}

export async function createSession(token: string, userId: number): Promise<Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    const session: Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    }
    await db.insert(sessionTable).values(session).execute()
    return session
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    const result = await db
        .select({ user: userTable, session: sessionTable })
        .from(sessionTable)
        .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
        .where(eq(sessionTable.id, sessionId))
        .execute()
    if (result.length < 1) {
        return { session: null, user: null }
    }
    const { user, session } = result[0]
    if (Date.now() >= session.expiresAt.getTime()) {
        await db.delete(sessionTable).where(eq(sessionTable.id, sessionId)).execute()
        return { session: null, user: null }
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
    await db
        .update(sessionTable)
        .set({
            expiresAt: session.expiresAt,
        })
        .where(eq(sessionTable.id, sessionId))
        .execute()
    return { session, user }
}

export async function invalidateSession(sessionId: string) {
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionId)).execute()
}

export type SessionValidationResult = { session: Session; user: User } | { session: null; user: null }
