import { Navbar } from "@/components/landing/navbar/navbar";
import { HeroSection } from "@/components/landing/hero/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works/how-it-works-section";
import { FeatureShowcaseSection } from "@/components/landing/feature-showcase/feature-showcase-section";
import { PricingSection } from "@/components/landing/pricing/pricing-section";
import { CommunitySection } from "@/components/landing/community/community-section";
import { TestimonialsSection } from "@/components/landing/testimonials/testimonials-section";
import { FaqSection } from "@/components/landing/faq/faq-section";
import { BottomCtaSection } from "@/components/landing/bottom-cta/bottom-cta-section";
import { FooterSection } from "@/components/landing/footer/footer-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] text-[#0D0D0D]">
      {/* Section 1: Floating Navigation Bar */}
      <Navbar />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1">
        {/* Section 2: Hero Section */}
        <HeroSection />

        {/* Section 3: How it Works (3 Value Proposition Cards) */}
        <HowItWorksSection />

        {/* Section 4: Outsourceable Errands Feature Showcase */}
        <FeatureShowcaseSection />

        {/* Section 5: 3 Pricing / Commission Tiers */}
        <PricingSection />

        {/* Section 6: Meet the Community / Trusted Local Helpers */}
        <CommunitySection />

        {/* Section 7: Community Stories & Testimonials */}
        <TestimonialsSection />

        {/* Section 8: FAQ Accordion & Lime Support Card */}
        <FaqSection />

        {/* Section 9: Dark Bottom CTA Section with Perspective Helper Strip */}
        <BottomCtaSection />
      </main>

      {/* Section 10: Dark Footer with Lime Newsletter Box */}
      <FooterSection />
    </div>
  );
}
