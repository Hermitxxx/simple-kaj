"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { perspectiveThumbnails } from "@/data/landing-mock-data";
import { FadeIn, ScaleOnHover } from "@/components/ui/motion";

export function BottomCtaSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="get-started"
      aria-labelledby="cta-title"
      className="relative bg-[#111111] text-white py-20 md:py-28 px-4 overflow-hidden border-t border-neutral-800"
    >
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
        <FadeIn className="w-full flex flex-col items-center">
          {/* Perspective / Curved Photo Strip of Helpers */}
          <div className="w-full max-w-3xl mb-12 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden py-3 px-2">
            {perspectiveThumbnails.map((url, idx) => (
              <motion.div
                key={idx}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.08,
                        y: -4,
                        zIndex: 20,
                        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                      }
                }
                className="relative h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 shrink-0 overflow-hidden rounded-xl border border-neutral-800 shadow-md cursor-pointer"
                style={{
                  transform: `rotate(${((idx - 3.5) * 2).toFixed(1)}deg) translateY(${Math.abs(idx - 3.5) * 3}px)`,
                }}
              >
                <Image
                  src={url}
                  alt="Community helper portrait"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Status Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
            <span>Get started in Dhaka</span>
          </div>

          {/* Headline */}
          <h2
            id="cta-title"
            className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.12] max-w-3xl text-balance mb-6"
          >
            Ready to get your daily errands handled?
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of Dhaka residents saving hours every week. Post your
            first errand in under 60 seconds with ৳0 platform fee and cash-on-completion.
          </p>

          {/* Lime Action Button with Spring Physics */}
          <ScaleOnHover scale={1.03} tapScale={0.97}>
            <Link
              href="#post-task"
              className="inline-flex items-center justify-center gap-2.5 bg-[#CCFF00] hover:bg-[#b8e600] text-[#0D0D0D] font-semibold text-base px-8 py-3.5 rounded-xl shadow-sm border border-lime-400/40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Post your first task — It&apos;s free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScaleOnHover>
        </FadeIn>
      </div>
    </section>
  );
}
