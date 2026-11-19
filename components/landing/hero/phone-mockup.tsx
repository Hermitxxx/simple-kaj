"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, MapPin, Phone, Star } from "lucide-react";
import { heroData } from "@/data/landing-mock-data";

export function PhoneMockup() {
  const { activeTaskPreview } = heroData;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      data-testid="phone-mockup"
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: [0, -6, 0],
            }
      }
      transition={{
        duration: 4.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.015 }}
      className="relative mx-auto w-[280px] sm:w-[310px] rounded-[2.5rem] border-[5px] border-neutral-900 bg-neutral-950 p-3 shadow-2xl shadow-neutral-950/40 text-left select-none"
    >
      {/* Top Speaker / Camera Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 h-3.5 w-24 rounded-full bg-neutral-900 flex items-center justify-center">
        <div className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
      </div>

      {/* Screen Container */}
      <div className="mt-4 rounded-[2rem] bg-neutral-900 border border-neutral-800 p-4 text-white overflow-hidden flex flex-col gap-3.5">
        {/* Screen Header Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-[#CCFF00]" />
            <span className="text-[11px] font-medium text-neutral-300">
              Active task
            </span>
          </div>
          <span className="text-xs font-semibold text-[#CCFF00] tabular-nums">
            {activeTaskPreview.budget}
          </span>
        </div>

        {/* Task Title & Route */}
        <div>
          <span className="inline-block rounded-full bg-lime-400/10 px-2 py-0.5 text-[10px] font-semibold text-[#CCFF00] mb-1">
            {activeTaskPreview.category}
          </span>
          <h2 className="text-sm font-bold text-white leading-tight">
            {activeTaskPreview.title}
          </h2>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-neutral-400">
            <MapPin className="h-3 w-3 text-neutral-500 shrink-0" />
            <span className="truncate">{activeTaskPreview.location}</span>
          </div>
        </div>

        {/* Assigned Helper Card */}
        <div className="rounded-xl bg-neutral-800/80 border border-neutral-700/50 p-2.5 flex items-center gap-2.5">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-neutral-700 bg-neutral-700">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
              alt={activeTaskPreview.helperName}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-white truncate">
                {activeTaskPreview.helperName}
              </span>
              <CheckCircle2 className="h-3 w-3 text-[#CCFF00] shrink-0" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-neutral-400">
              <span className="flex items-center text-amber-400 font-semibold">
                <Star className="h-2.5 w-2.5 fill-current mr-0.5" />
                {activeTaskPreview.helperRating}
              </span>
              <span>•</span>
              <span>{activeTaskPreview.helperTasks}</span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Call helper"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700 text-neutral-200 hover:text-white"
          >
            <Phone className="h-3 w-3" />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="rounded-xl bg-neutral-950/60 p-2.5 border border-neutral-800/70">
          <div className="flex items-center justify-between text-[10px] mb-1.5">
            <span className="text-neutral-400 flex items-center gap-1">
              <Clock className="h-3 w-3 text-[#CCFF00]" /> Status
            </span>
            <span className="font-semibold text-neutral-200">
              {activeTaskPreview.status}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-[#CCFF00] rounded-full transition-all duration-500"
              style={{ width: `${activeTaskPreview.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Mock Action */}
        <div className="pt-1">
          <div className="w-full py-2.5 rounded-xl bg-[#CCFF00] text-neutral-950 text-center font-semibold text-xs shadow-sm">
            Pay on delivery (Cash / bKash)
          </div>
        </div>
      </div>
    </motion.div>
  );
}
