"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bell, CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPhone.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="rounded-2xl bg-[#CCFF00] p-7 text-neutral-950 shadow-md border border-lime-400/50">
      <div className="inline-flex items-center gap-1.5 rounded-md bg-neutral-950 text-white px-2.5 py-1 text-xs font-medium mb-4">
        <Bell className="h-3 w-3 text-[#CCFF00]" />
        <span>Dhaka zone alerts</span>
      </div>

      <h3 className="text-2xl font-semibold tracking-tight mb-2">
        Get alerted when we launch in your zone
      </h3>
      <p className="text-sm font-normal leading-relaxed text-neutral-800 mb-6">
        Be the first to know when SimpleKaj activates in your neighborhood or
        campus. Receive ৳0 commission launch perks.
      </p>

      {isSubmitted ? (
        <div className="rounded-xl bg-neutral-950 text-white p-4 flex items-center gap-3 animate-in fade-in-0 duration-200">
          <CheckCircle2 className="h-5 w-5 text-[#CCFF00] shrink-0" />
          <div className="text-xs font-medium">
            You&apos;re on the priority list! We&apos;ll notify you the moment your Dhaka
            zone goes live.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="zone-input" className="sr-only">
            Email or Phone number for Dhaka zone alerts
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="zone-input"
              type="text"
              required
              placeholder="Email or 017XXXXXXXX"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="flex-1 rounded-xl bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-950"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              suppressHydrationWarning
              className="rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white font-semibold px-6 py-3 text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
            >
              Notify me
            </motion.button>
          </div>
        </form>
      )}

      {/* Zone Tags */}
      <div className="mt-6 pt-4 border-t border-neutral-900/15 flex flex-wrap gap-1.5 items-center">
        <span className="text-[11px] font-semibold text-neutral-800 mr-1">Active:</span>
        {["Gulshan", "Dhanmondi", "Uttara", "Mirpur", "DU Campus", "Banani"].map(
          (zone) => (
            <span
              key={zone}
              className="rounded-md bg-neutral-950/10 px-2 py-0.5 text-[11px] font-medium text-neutral-900"
            >
              {zone}
            </span>
          )
        )}
      </div>
    </div>
  );
}
