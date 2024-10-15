import { getAuth } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import firebase_app from "./firebase/config";

export function middleware(req: NextRequest){
    const auth = getAuth(firebase_app);
    const user = auth.currentUser;
    if(!user){
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/admin",
}