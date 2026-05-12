"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "yellow" | "outline-white" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary:
    "bg-brand-blue text-white hover:bg-blue-700 shadow-blue border-transparent",
  secondary:
    "bg-white text-brand-navy border-brand-navy hover:bg-gray-50",
  yellow:
    "bg-brand-yellow text-brand-navy hover:bg-yellow-400 border-transparent font-bold",
  "outline-white":
    "bg-transparent text-white border-white hover:bg-white/10",
  ghost:
    "bg-transparent text-brand-blue border-transparent hover:bg-blue-50",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-lg border-2
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
