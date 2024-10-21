import Link from "next/link";
import AccountDropdownMenu from "./AccountDropdownMenu";

export default function Header(){
    const navigation = [
        {name: "Home", href: "/"},
        {name: "Projects", href: "/projects"},
        {name: "About", href: "/about"},
        {name: "Blog", href: "/blog"},
        {name: "Contact", href: "/contact"},
    ]

    return (
        <header className=" flex items-center justify-between mx-8 py-5 font-bold text-2xl sticky top-0">
            <Link href="/" className="hover:text-nord-10 transition duration-300 text-3xl">My Portfolio</Link>
            <div className="flex items-center gap-4">
                <div className="flex gap-4">
                    {navigation.map(({name, href}) => (
                        <Link key={name} href={href} className="hover:text-nord-10 transition duration-300">
                            {name}
                        </Link>
                    ))}
                </div>
                <AccountDropdownMenu/>
            </div>
        </header>
    );
}
