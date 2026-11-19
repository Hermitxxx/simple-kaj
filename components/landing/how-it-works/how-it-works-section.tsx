"use client";

import { valueProps } from "@/data/landing-mock-data";
import { ValuePropCard } from "./value-prop-card";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui/motion";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="hiw-title"
      className="py-20 md:py-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-neutral-700 bg-neutral-200/80 border border-neutral-300/80 px-3 py-1 rounded-full mb-3">
            How it works
          </span>
          <h2
            id="hiw-title"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-950 mb-4 text-balance"
          >
            Everything you need to get daily tasks done for you
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Three simple steps to save hours every week across Dhaka. Transparent,
            safe, and hassle-free.
          </p>
        </FadeIn>

        {/* 3 Value Proposition Cards */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {valueProps.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <ValuePropCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
