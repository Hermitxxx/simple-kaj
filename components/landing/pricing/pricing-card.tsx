"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { PricingTier } from "@/data/types";
import { cn } from "@/lib/utils";
import { ScaleOnHover } from "@/components/ui/motion";

export function PricingCard({ tier }: { tier: PricingTier }) {
  const isFeatured = tier.isFeatured;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      data-testid="pricing-card"
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -3,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }
      }
      className={cn(
        "relative flex flex-col justify-between rounded-2xl p-7 transition-colors duration-200 h-full",
        isFeatured
          ? "bg-[#111111] text-white border border-[#CCFF00]/40 shadow-lg lg:-translate-y-1.5"
          : "bg-white text-neutral-900 border border-neutral-200/80 shadow-sm hover:shadow-md"
      )}
    >
      {/* Featured Badge Pill */}
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-[#CCFF00] px-3 py-0.5 text-xs font-semibold text-neutral-950 shadow-sm border border-lime-400/50">
          {tier.badge}
        </div>
      )}

      <div>
        {/* Tier Name & Commission */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-0.5 rounded-md",
              isFeatured
                ? "bg-neutral-800 text-[#CCFF00]"
                : "bg-neutral-100 text-neutral-700"
            )}
          >
            {tier.commission}
          </span>
        </div>

        {/* Pricing Display */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl sm:text-5xl font-semibold tracking-tight tabular-nums">
            {tier.price}
          </span>
          {tier.period && (
            <span
              className={cn(
                "text-xs font-medium",
                isFeatured ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              / {tier.period}
            </span>
          )}
        </div>

        {/* Description */}
        <p
          className={cn(
            "text-xs leading-relaxed mb-6",
            isFeatured ? "text-neutral-300" : "text-neutral-600"
          )}
        >
          {tier.description}
        </p>

        {/* Features List */}
        <div
          className={cn(
            "pt-5 border-t space-y-2.5 mb-8 text-xs",
            isFeatured ? "border-neutral-800" : "border-neutral-100"
          )}
        >
          {tier.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-md mt-0.5",
                  isFeatured
                    ? "bg-[#CCFF00] text-neutral-950"
                    : "bg-neutral-100 text-neutral-800"
                )}
              >
                <Check className="h-2.5 w-2.5 stroke-[2.5]" />
              </span>
              <span className={isFeatured ? "text-neutral-200" : "text-neutral-700"}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button with Spring Hover */}
      <ScaleOnHover scale={1.03} tapScale={0.97} className="w-full">
        <Link
          href={tier.ctaHref}
          className={cn(
            "inline-flex h-11 w-full items-center justify-center rounded-xl font-semibold text-xs transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2",
            isFeatured
              ? "bg-[#CCFF00] hover:bg-[#b8e600] text-[#0D0D0D] shadow-sm focus-visible:ring-white"
              : "bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm focus-visible:ring-neutral-900"
          )}
        >
          {tier.ctaText}
        </Link>
      </ScaleOnHover>
    </motion.div>
  );
}
