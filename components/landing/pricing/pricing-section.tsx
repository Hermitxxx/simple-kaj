"use client";

import { pricingTiers } from "@/data/landing-mock-data";
import { PricingCard } from "./pricing-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="py-20 md:py-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-neutral-700 bg-neutral-200/80 border border-neutral-300/80 px-3 py-1 rounded-full mb-3">
            Simple pricing
          </span>
          <h2
            id="pricing-title"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-950 mb-4 text-balance"
          >
            Simple pricing. Scalable growth.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Choose how you want to use SimpleKaj. Free for task posters, zero
            commission for workers during our launch month.
          </p>
        </FadeIn>

        {/* 3 Pricing Cards Grid */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4"
        >
          {pricingTiers.map((tier) => (
            <StaggerItem key={tier.id} className="h-full">
              <PricingCard tier={tier} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
