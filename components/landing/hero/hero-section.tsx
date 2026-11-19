"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star, UserCheck } from "lucide-react";
import { heroData } from "@/data/landing-mock-data";
import { PhoneMockup } from "./phone-mockup";
import { ScaleOnHover, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function HeroSection() {
  const [leftHelper, rightHelper] = heroData.flankingHelpers;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 px-4 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        <StaggerContainer
          animateImmediately
          staggerDelay={0.08}
          delayChildren={0.04}
          className="w-full flex flex-col items-center"
        >
          {/* Status Badge Pill */}
          <StaggerItem>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 border border-neutral-300/80 text-neutral-800 text-xs font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
              <span>{heroData.badge}</span>
            </div>
          </StaggerItem>

          {/* Display Headline */}
          <StaggerItem>
            <h1
              id="hero-title"
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-950 leading-[1.12] max-w-4xl text-balance mb-6"
            >
              Outsource your daily errands.{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">Done in minutes</span>
                <motion.span
                  aria-hidden="true"
                  initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: "left center" }}
                  className="absolute bottom-0 sm:bottom-0.5 md:bottom-1 left-0 right-0 h-3.5 sm:h-5 md:h-6 bg-[#CCFF00]/65 -z-0 rounded -rotate-1"
                />
              </span>{" "}
              by trusted neighbors
            </h1>
          </StaggerItem>

          {/* Subheadline */}
          <StaggerItem>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-9 leading-relaxed">
              {heroData.subtitle}
            </p>
          </StaggerItem>

          {/* Dual CTAs */}
          <StaggerItem className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-16">
              <ScaleOnHover scale={1.03} tapScale={0.97} className="w-full sm:w-auto">
                <Link
                  id="post-task"
                  href="#post-task"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CCFF00] hover:bg-[#b8e600] text-[#0D0D0D] font-semibold px-8 py-3.5 rounded-xl text-base shadow-sm border border-lime-400/40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                >
                  <span>Post a task (৳0 fee)</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </ScaleOnHover>

              <ScaleOnHover scale={1.03} tapScale={0.97} className="w-full sm:w-auto">
                <Link
                  id="become-worker"
                  href="#become-worker"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold px-8 py-3.5 rounded-xl text-base border border-neutral-300 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                >
                  <UserCheck className="h-4 w-4 text-neutral-700" />
                  <span>Become a helper</span>
                </Link>
              </ScaleOnHover>
            </div>
          </StaggerItem>

          {/* Centered Phone Mockup with Flanking Helper Cards */}
          <StaggerItem className="w-full">
            <div className="relative w-full max-w-4xl flex items-center justify-center pt-4">
              {/* Left Flanking Helper Card (Desktop) */}
              {leftHelper && (
                <motion.div
                  data-testid="hero-helper-left"
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden lg:flex absolute left-4 xl:left-8 top-1/3 -translate-y-1/2 rounded-xl bg-white border border-neutral-200/90 p-3 shadow-md items-center gap-3 z-20 text-left max-w-[210px] cursor-default"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
                    <Image
                      src={leftHelper.avatarUrl}
                      alt={leftHelper.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-neutral-900 truncate">
                        {leftHelper.name}
                      </span>
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate">
                      {leftHelper.zone} • {leftHelper.role}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-amber-500 font-semibold mt-0.5">
                      <Star className="h-2.5 w-2.5 fill-current" />
                      <span className="tabular-nums">{leftHelper.rating}</span>
                      <span className="text-neutral-400 font-normal">
                        ({leftHelper.tasks})
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Centered Smartphone Frame */}
              <PhoneMockup />

              {/* Right Flanking Helper Card (Desktop) */}
              {rightHelper && (
                <motion.div
                  data-testid="hero-helper-right"
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden lg:flex absolute right-4 xl:right-8 top-2/3 -translate-y-1/2 rounded-xl bg-white border border-neutral-200/90 p-3 shadow-md items-center gap-3 z-20 text-left max-w-[210px] cursor-default"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
                    <Image
                      src={rightHelper.avatarUrl}
                      alt={rightHelper.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-neutral-900 truncate">
                        {rightHelper.name}
                      </span>
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate">
                      {rightHelper.zone} • {rightHelper.role}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-amber-500 font-semibold mt-0.5">
                      <Star className="h-2.5 w-2.5 fill-current" />
                      <span className="tabular-nums">{rightHelper.rating}</span>
                      <span className="text-neutral-400 font-normal">
                        ({rightHelper.tasks})
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
