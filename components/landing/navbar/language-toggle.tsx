"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className="inline-flex items-center rounded-full bg-neutral-900 border border-neutral-800 p-1 text-xs font-semibold"
    >
      <motion.button
        type="button"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
        whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        suppressHydrationWarning
        className={cn(
          "px-2.5 py-1 rounded-full transition-all duration-150 cursor-pointer",
          lang === "en"
            ? "bg-white text-neutral-950 font-bold shadow-sm"
            : "text-neutral-400 hover:text-white"
        )}
      >
        EN
      </motion.button>
      <motion.button
        type="button"
        aria-pressed={lang === "bn"}
        onClick={() => setLang("bn")}
        whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
        whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        suppressHydrationWarning
        className={cn(
          "px-2.5 py-1 rounded-full transition-all duration-150 cursor-pointer",
          lang === "bn"
            ? "bg-[#CCFF00] text-neutral-950 font-bold shadow-sm"
            : "text-neutral-400 hover:text-white"
        )}
      >
        বাং
      </motion.button>
    </div>
  );
}
