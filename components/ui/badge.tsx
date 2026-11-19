import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: "lime" | "dark" | "neutral" | "outline";
}

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors";

  const variantStyles = {
    lime: "bg-[#CCFF00] text-[#0D0D0D] font-bold shadow-sm",
    dark: "bg-neutral-900 text-neutral-100 border border-neutral-700/60",
    neutral: "bg-neutral-200/80 text-neutral-800",
    outline: "border border-neutral-300 text-neutral-700 bg-white/70",
  };

  return <span className={cn(baseStyles, variantStyles[variant], className)} {...props} />;
}
