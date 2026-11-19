import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "lime" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "lime",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation cursor-pointer";

  const sizeStyles = {
    sm: "min-h-[38px] px-4 py-1.5 text-xs font-semibold gap-1.5",
    md: "min-h-[44px] px-6 py-2.5 text-sm font-bold gap-2",
    lg: "min-h-[50px] px-8 py-3.5 text-base font-bold gap-2.5",
  };

  const variantStyles = {
    lime: "bg-[#CCFF00] hover:bg-[#b8e600] text-[#0D0D0D] shadow-md shadow-lime-400/20 focus-visible:ring-[#CCFF00] focus-visible:ring-offset-neutral-900",
    dark: "bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/60 focus-visible:ring-neutral-700 focus-visible:ring-offset-white",
    outline:
      "border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100/70 focus-visible:ring-neutral-900",
    ghost:
      "bg-transparent text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/60 focus-visible:ring-neutral-400",
  };

  return (
    <button
      type={type}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    />
  );
}
