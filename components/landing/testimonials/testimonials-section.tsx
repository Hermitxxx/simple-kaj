"use client";

import { testimonials } from "@/data/landing-mock-data";
import { TestimonialCard } from "./testimonial-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="py-20 md:py-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-neutral-700 bg-neutral-200/80 border border-neutral-300/80 px-3 py-1 rounded-full mb-3">
            Community stories
          </span>
          <h2
            id="testimonials-title"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-950 mb-4 text-balance"
          >
            Loved by posters and workers alike
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            See how SimpleKaj is empowering Dhaka residents to reclaim lost time
            and earn reliable neighborhood income.
          </p>
        </FadeIn>

        {/* 3 Testimonials Grid with Staggered Entrance */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <TestimonialCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
