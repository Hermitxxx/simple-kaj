"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/data/types";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4" role="region" aria-label="Frequently Asked Questions">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const triggerId = `faq-trigger-${item.id}`;
        const contentId = `faq-content-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border transition-colors duration-200 overflow-hidden",
              isOpen
                ? "bg-white border-neutral-300 shadow-sm"
                : "bg-white/70 border-neutral-200/80 hover:border-neutral-300"
            )}
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left font-semibold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 cursor-pointer"
              >
                <span className="text-base sm:text-lg leading-snug">{item.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                    isOpen
                      ? "bg-neutral-900 text-[#CCFF00]"
                      : "bg-neutral-100 text-neutral-600"
                  )}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  suppressHydrationWarning
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm leading-relaxed text-neutral-600">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
