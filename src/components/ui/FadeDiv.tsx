"use client"

import { motion } from "framer-motion"
import React from "react"

export default function FadeDiv({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className={className}>
            {children}
        </motion.div>
    )
}
