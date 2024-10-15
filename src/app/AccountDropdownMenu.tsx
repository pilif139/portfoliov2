"use client";

import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AcccountDropdownMenu(){
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
                    <Link href='/profile' className='block px-4 py-2 hover:bg-nord-2'>
                        Profile
                    </Link>
                    <Link href='/settings' className='block px-4 py-2 hover:bg-nord-2'>
                        Settings
                    </Link>
                    <Link href='/logout'  className='block px-4 py-2 hover:bg-nord-2'>
                        Logout
                    </Link>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    )
}
