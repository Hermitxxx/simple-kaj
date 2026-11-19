"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Package, Shield, ShoppingBag, Wrench } from "lucide-react";
import type { ErrandFeature } from "@/data/types";

const iconMap = {
  "shopping-bag": ShoppingBag,
  clock: Clock,
  package: Package,
  wrench: Wrench,
  shield: Shield,
};

export function FeatureCard({ item }: { item: ErrandFeature }) {
  const IconComponent = iconMap[item.iconName] || ShoppingBag;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -3,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }
      }
      className="group relative overflow-hidden rounded-2xl bg-white border border-neutral-200/80 shadow-sm transition-colors duration-200 hover:shadow-md hover:border-neutral-300 flex flex-col md:flex-row items-stretch"
    >
      {/* Content Area */}
      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Top Tag & Price */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 text-white px-2.5 py-1 text-xs font-medium cursor-default">
              <IconComponent className="h-3.5 w-3.5 text-[#CCFF00]" />
              {item.tag}
            </span>
            <span className="inline-flex items-center rounded-lg bg-neutral-100 border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-800 cursor-default tabular-nums">
              {item.priceEstimate}
            </span>
          </div>

          {/* Heading */}
          <h3 className="text-xl font-semibold text-neutral-950 tracking-tight leading-snug mb-1.5">
            {item.title}
          </h3>

          {/* Bangla Sub-label */}
          <p className="text-xs font-medium text-neutral-600 mb-3">
            {item.banglaTitle}
          </p>

          {/* Description */}
          <p className="text-sm leading-relaxed text-neutral-600 max-w-xl">
            {item.description}
          </p>
        </div>

        {/* Bottom Feature Hint */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700">
          <span className="flex h-2 w-2 rounded-full bg-[#CCFF00]" />
          <span>Vetted NID-verified helpers ready across Dhaka</span>
        </div>
      </div>

      {/* Visual Image / Thumbnail Area */}
      <div className="relative w-full md:w-[320px] lg:w-[380px] h-48 md:h-auto shrink-0 overflow-hidden bg-neutral-100">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60" />
      </div>
    </motion.article>
  );
}
