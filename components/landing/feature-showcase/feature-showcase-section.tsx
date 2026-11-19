"use client";

import { errandFeatures } from "@/data/landing-mock-data";
import { FeatureCard } from "./feature-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function FeatureShowcaseSection() {
  return (
    <section
      id="errands"
      aria-labelledby="features-title"
      className="py-20 md:py-28 px-4 bg-neutral-100/40 border-y border-neutral-200/60"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-neutral-700 bg-neutral-200/80 border border-neutral-300/80 px-3 py-1 rounded-full mb-3">
            Services & errands
          </span>
          <h2
            id="features-title"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-950 mb-4 text-balance"
          >
            Services you can actually outsource
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            From quick morning bazaar pickups to long bureaucratic government queues,
            our vetted Dhaka helpers have you covered.
          </p>
        </FadeIn>

        {/* 5 Stacked Landscape Feature Cards */}
        <StaggerContainer staggerDelay={0.12} className="flex flex-col gap-6">
          {errandFeatures.map((item) => (
            <StaggerItem key={item.id}>
              <FeatureCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
