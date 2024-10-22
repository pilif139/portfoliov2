import {getCurrentSession} from "@/lib/auth/session";
import Link from "next/link";
import logout from "@/lib/auth/logoutAction";
import DropdownMenu from "@/components/DropdownMenu";
import {MdOutlineAccountCircle} from "react-icons/md";

const menuElementClass = "block px-4 py-2 hover:bg-nord-4 hover:text-nord-10 transition duration-300 font-medium w-full flex";

export default async function AccountMenu(){

    const { user, session } = await getCurrentSession();
    if(session === null){
        return (
            <DropdownMenu button={<MdOutlineAccountCircle size={35}/>}>
                <Link href="/login" className={menuElementClass}>Login</Link>
                <Link href="/register" className={menuElementClass}>Register</Link>
            </DropdownMenu>
        )
    } else{
        return (
            <DropdownMenu button={<MdOutlineAccountCircle size={35}/>}>
                <p className="text-center p-2">{user.username}</p>
                <hr className="bg-nord-6 h-2"/>
                <Link href="/profile" className={menuElementClass}>Profile</Link>
                <Link href="/settings" className={menuElementClass}>Settings</Link>
                <LogoutButton sessionId={session.id}></LogoutButton>
            </DropdownMenu>
        )
    }
}

function LogoutButton({sessionId}: {sessionId: string}){
    const logoutAction = logout.bind(null, sessionId);

    return (
        <form action={logoutAction}>
            <button type="submit" className={menuElementClass}>Logout</button>
        </form>
    )

}