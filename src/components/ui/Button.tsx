type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function Button({ children, className, variant} : ButtonProps) {
  const variantStyle = variant === "secondary" ? "bg-nord-0 hover:bg-nord-1 border-2 border-white" : "bg-nord-10 hover:bg-nord-9";

  return (
    <button className={`text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-fit 
    ${variantStyle} ${className}`}>
        {children}
    </button>
  );
}