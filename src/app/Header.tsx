import Link from "next/link";

export default function Header(){
    const navigation = [
        {name: "Home", href: "/"},
        {name: "Projects", href: "/projects"},
        {name: "About", href: "/about"},
    ]

    return (
        <header className=" flex items-center justify-between lg:mx-16 p-4 py-5 font-bold text-2xl sticky top-0">
            <h1>My Portfolio</h1>
            <div className="flex gap-4">
                {navigation.map(({name, href}) => (
                    <Link key={name} href={href}>
                        {name}
                    </Link>
                ))}
            </div>
        </header>
    );
}