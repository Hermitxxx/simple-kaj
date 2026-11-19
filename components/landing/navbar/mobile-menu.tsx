"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/data/types";
import { LanguageToggle } from "./language-toggle";
import { useIsMounted } from "@/components/ui/motion";

interface MobileMenuProps {
  items: NavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useIsMounted();
  const shouldReduceMotion = useReducedMotion();

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const menuDrawer = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -12 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.1,
            ease: "easeOut",
          }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#111111]/98 px-6 py-6 backdrop-blur-2xl overflow-y-auto text-white pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 group select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] rounded-lg px-1"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#CCFF00] text-neutral-950 font-bold text-xs">
                SK
              </span>
              <span className="text-base font-semibold tracking-tight text-white">
                Simple<span className="text-[#CCFF00]">Kaj</span>
              </span>
            </Link>

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 hover:text-white transition cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-8 flex flex-col gap-5" aria-label="Mobile Navigation Links">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-neutral-200 hover:text-[#CCFF00] transition-colors py-1.5 border-b border-neutral-900/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Controls & CTA in Mobile Menu */}
          <div className="mt-auto flex flex-col gap-4 pt-8 border-t border-neutral-800">
            <div className="flex items-center justify-between py-1">
              <span className="text-xs font-medium text-neutral-400">
                Language / ভাষা
              </span>
              <LanguageToggle />
            </div>

            <Link
              href="#post-task"
              onClick={() => setIsOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-[#CCFF00] hover:bg-[#b8e600] font-semibold text-[#0D0D0D] text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              Post a Task (৳0 Fee)
            </Link>

            <Link
              href="#become-worker"
              onClick={() => setIsOpen(false)}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 font-semibold text-neutral-300 hover:text-white text-xs transition cursor-pointer"
            >
              Become a Helper (0% Commission)
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden flex items-center gap-2">
      <motion.button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close main navigation menu" : "Open main navigation menu"}
        onClick={() => setIsOpen((prev) => !prev)}
        whileTap={{ scale: shouldReduceMotion ? 1 : 0.92 }}
        suppressHydrationWarning
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-800 text-white hover:bg-neutral-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] cursor-pointer"
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </motion.button>

      {mounted && typeof document !== "undefined"
        ? createPortal(menuDrawer, document.body)
        : null}
    </div>
  );
}
