"use client"

import React, { MouseEvent } from "react"

type ButtonProps = {
    children: React.ReactNode
    type?: "button" | "submit" | "reset"
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    className?: string
    variant?: "primary" | "primary-2" | "secondary" | "error"
    disabled?: boolean
}

export default function Button({ children, type = "button", onClick, className, variant, disabled }: ButtonProps) {
    const variants = {
        primary: "bg-nord-10 hover:bg-nord-9 text-2xl border-2 border-nord-10 py-3 px-7",
        "primary-2": "bg-nord-14 hover:bg-nord-13 text-2xl border-2 border-nord-14 py-4 px-5",
        secondary: "bg-nord-0 hover:bg-nord-1 border-2 border-white",
        error: "bg-nord-11 hover:bg-nord-12",
    }
    const variantStyle = variants[variant || "primary"]

    return (
        <button
            type={type}
            className={`${variantStyle} ${className} text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-fit ${disabled ? "opacity-50" : ""}
     `}
            aria-disabled={disabled}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
