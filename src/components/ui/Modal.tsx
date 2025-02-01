"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useModalContext } from "../ModalContext"

export default function Modal() {
    const { isOpen, component, closeModal } = useModalContext()
    return (
        <AnimatePresence>
            {isOpen && component && (
                <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.05 }}
                    className={`absolute overflow-hidden inset-0 flex items-center justify-center z-51`}
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-xs" onClick={closeModal}></div>
                    <button onClick={closeModal} className="absolute top-0 right-0 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <motion.div
                        initial={{ scale: 0.5, y: -100 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.5 }}
                        className="bg-theme-3 p-4 rounded-xl absolute m-auto z-52"
                    >
                        {component}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
