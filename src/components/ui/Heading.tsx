type HeadingProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "5xl" | "4xl" | "3xl" | "2xl" | "xl" | "lg" | "base";
};

export default function Heading({ children, className, variant = "4xl"} : HeadingProps) {
    const CustomTag = `h${variant}` as keyof JSX.IntrinsicElements;
    const textSize : Record<string, string> = {
        "5xl": "text-5xl",
        "4xl": "text-4xl",
        "3xl": "text-3xl",
        "2xl": "text-2xl",
        "xl": "text-xl",
        "lg": "text-lg",
        "base": "text-base",
    }
    
    return (
        <CustomTag className={`${textSize[variant]} font-bold text-nord-10 ${className}`}>{children}</CustomTag>
    );
}