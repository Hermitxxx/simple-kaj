"use client";

import { faqItems } from "@/data/landing-mock-data";
import { FaqContactCard } from "./faq-contact-card";
import { FaqAccordion } from "./faq-accordion";
import { FadeIn } from "@/components/ui/motion";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="py-20 md:py-28 px-4 bg-neutral-100/40 border-t border-neutral-200/60"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-medium text-neutral-700 bg-neutral-200/80 border border-neutral-300/80 px-3 py-1 rounded-full mb-3">
            Questions & answers
          </span>
          <h2
            id="faq-title"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-950 mb-4 text-balance"
          >
            Frequently asked questions
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Everything you need to know about posting errands, helper trust and
            verification, and payments in Dhaka.
          </p>
        </FadeIn>

        {/* 2-Column Layout */}
        <FadeIn delay={0.15} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Lime Contact / Support Card */}
          <div className="lg:col-span-5">
            <FaqContactCard />
          </div>

          {/* Right Column: Accessible FAQ Accordion */}
          <div className="lg:col-span-7">
            <FaqAccordion items={faqItems} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
