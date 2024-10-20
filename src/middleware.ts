import { NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers";
import {verifySession} from "@/lib/auth/session";
import {adminAuth} from "@/firebase/serverApp";

export async function middleware(req: NextRequest) {
    const sessionCookie = cookies().get('session')?.value;
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    await verifySession(sessionCookie); // if it throws error, it will redirect to /login

    return NextResponse.next();
}

export const config = {
    matcher: "/admin",
}