"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer(){
    return (
        <footer className="relative bottom-0 flex items-center justify-center p-4 font-bold text-2xl gap-3">
            <h1>Created by Filip Kasperski</h1>
            <motion.a 
                whileHover={{ scale: 1.15 }}
                href="https://www.github.com/pilif139" target="blank">
                <FaGithub size={45}/>
            </motion.a>
            <motion.a
                whileHover={{ scale: 1.15 }}
                href="https://www.linkedin.com/in/filip-kasperski-b80a8b310/" target="blank">
                <FaLinkedin size={45} />
            </motion.a>
        </footer>
    );
}