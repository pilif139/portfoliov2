import Link from "next/link";

export default function Header(){
    const navigation = [
        {name: "Home", href: "/"},
        {name: "Projects", href: "/projects"},
        {name: "About", href: "/about"},
        {name: "Blog", href: "/blog"},
        {name: "Contact", href: "/contact"},
    ]

    return (
        <header className=" flex items-center justify-between lg:mx-16 p-4 py-5 font-bold text-2xl sticky top-0">
            <Link href="/" className="hover:text-nord-5 transition duration-300 text-3xl">My Portfolio</Link>
            <div className="flex gap-4">
                {navigation.map(({name, href}) => (
                    <Link key={name} href={href} className="hover:text-nord-5 transition duration-300">
                        {name}
                    </Link>
                ))}
            </div>
        </header>
    );
}