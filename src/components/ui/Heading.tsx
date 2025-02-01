export type HeadingProps = {
    children: React.ReactNode
    className?: string
    variant?: "1" | "2" | "3" | "4" | "5" | "6" | "7"
}

export default function Heading({ children, className, variant = "2" }: HeadingProps) {
    const CustomTag = `h${variant}` as keyof JSX.IntrinsicElements
    const textSize: Record<string, string> = {
        "1": "text-5xl",
        "2": "text-4xl",
        "3": "text-3xl",
        "4": "text-2xl",
        "5": "text-xl",
        "6": "text-lg",
        "7": "text-base",
    }

    return <CustomTag className={`${textSize[variant]} font-bold text-theme-10 ${className}`}>{children}</CustomTag>
}
