"use client"

import clsx from "clsx"
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
        primary: "bg-theme-10 hover:bg-theme-9 text-xl border-2 border-theme-10 py-3 px-5",
        "primary-2": "bg-theme-14 hover:bg-theme-13 text-xl border-2 border-theme-14 py-3 px-4",
        secondary: "border-2 border-white",
        error: "bg-theme-11 hover:bg-theme-12",
    }
    const variantStyle = variants[variant || "primary"]

    return (
        <button
            type={type}
            className={clsx(`cursor-pointer text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-fit ${disabled ? "opacity-50" : ""}`,
                className,
                variantStyle,
            )}
            aria-disabled={disabled}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
