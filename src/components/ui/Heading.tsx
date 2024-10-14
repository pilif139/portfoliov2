type HeadingProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "1" | "2" | "3" | "4" | "5" | "6";
};

export default function Heading({ children, className, variant = "1" } : HeadingProps) {
    const CustomTag = `h${variant}` as keyof JSX.IntrinsicElements;
    const textSize = {
        "1": "text-4xl",
        "2": "text-3xl",
        "3": "text-2xl",
        "4": "text-xl",
        "5": "text-lg",
        "6": "text-base",
    }

    return (
        <CustomTag className={`${textSize[variant]} font-bold text-nord-5 ${className}`}>{children}</CustomTag>
    );
}