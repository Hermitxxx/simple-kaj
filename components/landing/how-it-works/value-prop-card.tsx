"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PlusCircle, ShieldCheck, Zap } from "lucide-react";
import type { ValueProp } from "@/data/types";

const iconMap = {
  "plus-circle": PlusCircle,
  zap: Zap,
  "shield-check": ShieldCheck,
};

export function ValuePropCard({ item }: { item: ValueProp }) {
  const IconComponent = iconMap[item.iconName] || Zap;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      data-testid="value-prop-card"
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -3,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }
      }
      className="relative flex flex-col justify-between rounded-2xl bg-[#111111] border border-neutral-800/90 p-7 transition-colors duration-200 hover:border-neutral-700 hover:shadow-lg group h-full"
    >
      {/* Top Row: Icon & Step Number */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CCFF00] text-neutral-950 font-semibold shadow-sm">
          <IconComponent className="h-5 w-5 stroke-[2]" />
        </div>
        <span className="font-mono text-lg font-medium text-neutral-500 tabular-nums">
          {item.step}
        </span>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2.5 tracking-tight">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-400">
          {item.description}
        </p>
      </div>

      {/* Bottom Accent Line */}
      <div className="mt-8 pt-4 border-t border-neutral-800/60 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Step {item.step} of 03
        </span>
      </div>
    </motion.div>
  );
}
