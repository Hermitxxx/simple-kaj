import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all",
        className
      )}
      {...props}
    />
  );
}
