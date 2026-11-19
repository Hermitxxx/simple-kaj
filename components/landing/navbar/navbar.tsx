"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { navItems } from "@/data/landing-mock-data";
import { LanguageToggle } from "./language-toggle";
import { MobileMenu } from "./mobile-menu";
import { ScaleOnHover } from "@/components/ui/motion";

export function Navbar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 flex justify-center pointer-events-none">
      <motion.div
        initial={shouldReduceMotion ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={shouldReduceMotion ? { opacity: 1, transform: "none" } : undefined}
        suppressHydrationWarning
        className="w-full max-w-5xl rounded-2xl bg-[#111111]/92 backdrop-blur-md border border-white/10 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xl shadow-black/20 pointer-events-auto"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] rounded-lg px-1"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#CCFF00] text-neutral-950 font-bold text-xs transition-transform group-hover:scale-105">
            SK
          </span>
          <span className="text-base font-semibold tracking-tight text-white">
            Simple<span className="text-[#CCFF00]">Kaj</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-neutral-300"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#CCFF00] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CCFF00] rounded-md"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <ScaleOnHover scale={1.03} tapScale={0.97}>
            <Link
              href="#post-task"
              className="inline-flex items-center justify-center bg-[#CCFF00] hover:bg-[#b8e600] text-[#0D0D0D] font-semibold px-4 py-2 rounded-xl text-xs lg:text-sm border border-lime-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              Post a Task
            </Link>
          </ScaleOnHover>
        </div>

        {/* Mobile Menu Drawer Toggle */}
        <MobileMenu items={navItems} />
      </motion.div>
    </header>
  );
}
