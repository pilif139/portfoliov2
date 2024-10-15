"use client";

import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

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
            <MdOutlineAccountCircle size={35} className="hover:text-nord-10 transition duration-300 cursor-pointer" onClick={()=>setIsOpen(!isOpen)}/>
            { isOpen && (
                <div className='absolute top-16 bg-white text-black right-0 mt-2 py-2 w-48 border rounded shadow-xl'>
                <Link href='/profile' className='block px-4 py-2 hover:bg-gray-200'>
                    Profile
                </Link>
                <Link href='/settings' className='block px-4 py-2 hover:bg-gray-200'>
                    Settings
                </Link>
                <Link href='/logout'  className='block px-4 py-2 hover:bg-gray-200'>
                    Logout
                </Link>
            </div>
            )}
        </div>
    )
}
