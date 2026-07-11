import { ButtonHTMLAttributes, ReactNode } from "react";
import { FiLoader } from "react-icons/fi";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20",
    secondary:
      "bg-secondary text-white hover:bg-secondary/90 shadow-md shadow-secondary/20",
    outline:
      "bg-transparent border border-neutral/20 text-neutral hover:bg-bg-light",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <FiLoader className="animate-spin" size={16} />}
      {children}
    </button>
  );
}
