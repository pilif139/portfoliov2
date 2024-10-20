import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function Button({ children, onClick, className, variant} : ButtonProps) {
  const variants = {
    "primary": "bg-nord-10 hover:bg-nord-9",
    "secondary": "bg-nord-0 hover:bg-nord-1 border-2 border-white",
    "error": "bg-nord-11 hover:bg-nord-12"
  }
  const variantStyle = variants[variant || "primary"];

  return (
    <button className={`text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-fit 
    ${variantStyle} ${className}`} onClick={onClick}>
        {children}
    </button>
  );
}