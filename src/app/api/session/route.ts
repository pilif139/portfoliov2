export const dynamic = true;

import { NextResponse} from "next/server";
import {getCurrentSession} from "@/lib/auth/session";

// Route handler for client components to get current session and user;
export const GET = async () => {
    const { session, user } = await getCurrentSession();
    if(session === null){
        return NextResponse.json({session: null, user: null});
    }
    const { id, username, email, role } = user;
    return NextResponse.json({session: {id: session.id}, user: {id, username, email, role}});
}