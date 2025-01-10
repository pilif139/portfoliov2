"use client"

import { AnimatePresence, motion } from "framer-motion"

export default function FormError({ errors }: { errors: string[] | string }) {
    if (typeof errors === "string") {
        errors = [errors]
    }

    return (
        <ul className="list-disc ml-5">
            <AnimatePresence>
                {errors?.map((error, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="text-nord-11"
                    >
                        {error}
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    )
}
