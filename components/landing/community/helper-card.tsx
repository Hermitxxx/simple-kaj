"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Bookmark, CheckCircle2, MapPin, Share2, Star } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import type { CommunityHelper } from "@/data/types";

export function HelperCard({ helper }: { helper: CommunityHelper }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      data-testid="helper-card"
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -3,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }
      }
      className="flex justify-center w-full h-full"
    >
      <SpotlightCard
        theme="dark"
        spotlightColor="rgba(204, 255, 0, 0.18)"
        intensity={0.16}
        borderGlow={0.5}
        spotlightSize={240}
        className="relative flex flex-col justify-between w-full max-w-[340px] rounded-2xl p-6 bg-[#111111] border border-neutral-800/80 text-white shadow-xl transition-colors"
      >
        {/* Top Header: Avatar & Share Icon */}
        <div className="relative flex flex-col items-center text-center">
          <button
            type="button"
            aria-label={`Share ${helper.name}'s profile`}
            className="absolute top-0 right-0 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
          </button>

          {/* Centered Avatar */}
          <div className="relative h-20 w-20 rounded-full overflow-hidden border border-neutral-700/80 mb-3.5 shadow-sm bg-neutral-900">
            <Image
              src={helper.avatarUrl}
              alt={helper.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          {/* Name & Specialty */}
          <h3 className="text-lg font-semibold text-white tracking-tight">
            {helper.name}
          </h3>
          <p className="text-xs font-normal text-neutral-400 mt-1">
            {helper.specialty}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5">
            <span className="inline-flex items-center gap-1 rounded-md bg-neutral-800/90 border border-neutral-700/60 px-2.5 py-0.5 text-[11px] font-medium text-neutral-200">
              <CheckCircle2 className="h-3 w-3 text-[#CCFF00]" />
              {helper.badge}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-neutral-800/90 border border-neutral-700/60 px-2.5 py-0.5 text-[11px] font-medium text-neutral-200">
              <MapPin className="h-3 w-3 text-neutral-400" />
              {helper.zone}
            </span>
          </div>
        </div>

        {/* 3-Column Stats Row */}
        <div className="my-6 grid grid-cols-3 divide-x divide-neutral-800/80 rounded-xl bg-neutral-900/70 border border-neutral-800/80 py-3 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-sm font-semibold text-white">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="tabular-nums">{helper.rating}</span>
            </div>
            <span className="text-[10px] font-medium text-neutral-400">
              Rating
            </span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white tabular-nums">
              {helper.completedTasks}
            </div>
            <span className="text-[10px] font-medium text-neutral-400">
              Tasks
            </span>
          </div>
          <div>
            <div className="text-sm font-semibold text-[#CCFF00] tabular-nums">
              ৳150+
            </div>
            <span className="text-[10px] font-medium text-neutral-400">
              Rate
            </span>
          </div>
        </div>

        {/* Bottom Actions: Request + Bookmark */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-[#CCFF00] text-white hover:text-neutral-950 font-semibold text-xs tracking-wide transition-colors duration-150 shadow-sm border border-neutral-700 hover:border-[#CCFF00] cursor-pointer"
          >
            Request helper
          </button>
          <button
            type="button"
            aria-label={`Save ${helper.name} to bookmarks`}
            className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
