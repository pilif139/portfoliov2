"use client";

import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AcccountDropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const node = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (node.current && (node.current === e.target || node.current.contains(e.target as Node))){
            // inside click
            return;
        }
        // outside click 
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const unloggedMenu = [
        {name: 'Login', href: '/login'},
        {name: 'Register', href: '/register'}
    ]

    const loggedMenu = [
        {name: 'Profile', href: '/profile'},
        {name: 'Settings', href: '/settings'},
        {name: 'Logout', href: '/logout'}
    ]
    // get user from a context (react context, zustand or redux)
    const user = {username: 'John Doe'};
    const menu = user ? loggedMenu : unloggedMenu;
    
    return (
        <div ref={node}>
            <button 
                className="hover:text-nord-10 transition duration-300 cursor-pointer flex items-center" 
                onClick={()=>setIsOpen(!isOpen)}>
                <MdOutlineAccountCircle size={35}/>
            </button>
            <AnimatePresence>
            { isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className='absolute top-16 bg-nord-3 text-nord-5 right-0 mt-2 py-2 w-48 rounded shadow-xl shadow-gray-950'>
                    {user && <><p className='px-4 py-2 text-center font-bold'>{user.username}</p> <hr className="bg-nord-6 h-1 mt-1"></hr></>}
                    {
                        menu.map((item, index) => (
                            <Link key={index} href={item.href} className='block px-4 py-2 hover:bg-nord-4 hover:text-nord-10 transition duration-300 font-medium'>
                                {item.name}
                            </Link>
                        ))
                    }
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    )
}
