export const dynamic = true;

import {NextRequest, NextResponse} from "next/server";
import {getCurrentSession} from "@/lib/auth/session";

export const GET = async (req: NextRequest) => {
    const { session, user } = await getCurrentSession();
    if(session === null){
        return NextResponse.json({session: null, user: null});
    }
    const { id, username, email, role } = user;
    return NextResponse.json({session: {id: session.id}, user: {id, username, email, role}});
}