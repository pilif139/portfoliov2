import {getCurrentSession} from "@/lib/auth/session";
import Link from "next/link";
import logout from "@/lib/auth/logoutAction";

export default async function AccountMenu(){
    const menuElementClass = "block px-4 py-2 hover:bg-nord-4 hover:text-nord-10 transition duration-300 font-medium w-full flex";

    const { user, session } = await getCurrentSession();
    if(session === null){
        return (
            <>
                <Link href="/login" className={menuElementClass}>Login</Link>
                <Link href="/register" className={menuElementClass}>Register</Link>
            </>
        )
    } else{
        return (
            <>
                <p className="text-center p-2">{user.username}</p>
                <hr className="bg-nord-6 h-2"/>
                <Link href="/profile" className={menuElementClass}>Profile</Link>
                <Link href="/settings" className={menuElementClass}>Settings</Link>
                <button onClick={()=>logout(session.id)} className={menuElementClass}>Logout</button>
            </>
        )
    }
}