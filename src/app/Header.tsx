import Link from "next/link"
import AccountMenu from "@/app/AccountMenu"

export default function Header() {
    const navigation = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/projects" },
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ]

    return (
        <header className=" flex items-center justify-between px-8 py-5 font-bold text-xl sticky z-50 top-0 bg-opacity-40 backdrop-blur-xl">
            <Link href="/" className="hover:text-theme-10 transition duration-300 text-3xl">
                My Portfolio
            </Link>
            <div className="flex items-center gap-4">
                <div className="flex gap-4">
                    {navigation.map(({ name, href }) => (
                        <Link key={name} href={href} className="hover:text-theme-9 transition duration-300">
                            {name}
                        </Link>
                    ))}
                </div>
                <AccountMenu />
            </div>
        </header>
    )
}
