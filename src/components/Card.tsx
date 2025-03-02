import React from "react"

interface CardProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

// Main Card component
export default function Card({ children, className = "", onClick }: CardProps) {
    return (
        <div
            className={`flex flex-col bg-theme-2 hover:bg-theme-0 transition w-fit min-h-fit hover:shadow-2xl shadow-theme-1 p-4 rounded-xl ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

// Card subcomponents using the composition pattern
Card.Header = function CardHeader({ children, className = "", onClick }: CardProps) {
    return <header onClick={onClick} className={`mb-4 text-2xl font-bold ${className}`}>{children}</header>
}

Card.Content = function CardContent({ children, className = "", onClick }: CardProps) {
    return <article onClick={onClick} className={`flex-grow ${className}`}>{children}</article>
}

Card.Footer = function CardFooter({ children, className = "", onClick }: CardProps) {
    return <footer onClick={onClick} className={`mt-4 flex gap-4 ${className}`}>{children}</footer>
}
