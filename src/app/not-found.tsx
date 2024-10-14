"use client"

import Heading from "@/components/ui/Heading"
import {motion} from "framer-motion"

export default function NotFound(){
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            className="m-auto text-center"
        >
            <Heading variant="5xl" className="text-nord-7">404 Error</Heading>
            <p className="text-3xl">Page not found</p>
        </motion.div>
    )
}