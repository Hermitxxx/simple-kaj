"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MessageSquare, PhoneCall, Zap } from "lucide-react";
import { ScaleOnHover } from "@/components/ui/motion";

export function FaqContactCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -2,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }
      }
      className="rounded-2xl bg-[#CCFF00] p-7 text-neutral-950 flex flex-col justify-between shadow-md border border-lime-400/50"
    >
      <div>
        {/* Status Pill */}
        <div className="inline-flex items-center gap-1.5 rounded-md bg-neutral-950 text-white px-2.5 py-1 text-xs font-medium mb-6">
          <Zap className="h-3 w-3 text-[#CCFF00]" />
          <span>Typical response: &lt; 5 mins</span>
        </div>

        <h3 className="text-2xl font-semibold tracking-tight mb-2.5">
          Have questions?
        </h3>
        <p className="text-sm font-normal leading-relaxed text-neutral-800 mb-8">
          Our dedicated Dhaka community team is available 24/7 on WhatsApp and phone
          to assist posters and helpers with safety, verification, and task questions.
        </p>
      </div>

      <div className="space-y-3.5 pt-6 border-t border-neutral-900/15">
        <ScaleOnHover scale={1.03} tapScale={0.97} className="w-full">
          <Link
            href="https://wa.me/8801700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 hover:bg-neutral-900 font-semibold text-white text-xs shadow-sm transition-colors"
          >
            <MessageSquare className="h-4 w-4 text-[#CCFF00]" />
            <span>Chat on WhatsApp</span>
          </Link>
        </ScaleOnHover>

        <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-900">
          <PhoneCall className="h-3.5 w-3.5" />
          <span>Hotline: +880 1700-KAJ-NOW</span>
        </div>
      </div>
    </motion.div>
  );
}
