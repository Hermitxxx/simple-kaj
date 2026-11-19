"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import { useIsReducedMotion } from "@/components/ui/motion";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reduceMotion = useIsReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
