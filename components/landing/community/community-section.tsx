"use client";

import { communityHelpers } from "@/data/landing-mock-data";
import { HelperCard } from "./helper-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function CommunitySection() {
  return (
    <section
      id="helpers"
      aria-labelledby="community-title"
      className="py-20 md:py-28 px-4 bg-neutral-100/30 border-t border-neutral-200/60 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-neutral-700 bg-neutral-200/80 border border-neutral-300/80 px-3 py-1 rounded-full mb-3">
            Trusted community
          </span>
          <h2
            id="community-title"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-950 mb-4 text-balance"
          >
            Meet your neighborhood helpers
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Real university students, verified riders, and local residents across
            Dhaka with verified ratings and completed errand records.
          </p>
        </FadeIn>

        {/* 6 Helpers Grid with Staggered Entrance */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {communityHelpers.map((helper) => (
            <StaggerItem key={helper.id} className="h-full">
              <HelperCard helper={helper} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
