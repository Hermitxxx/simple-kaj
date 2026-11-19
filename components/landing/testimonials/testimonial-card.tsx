"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/data/types";

export function TestimonialCard({ item }: { item: Testimonial }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.figure
      data-testid="testimonial-card"
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -3,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }
      }
      className="flex flex-col justify-between rounded-2xl bg-white border border-neutral-200/80 p-7 shadow-sm transition-colors duration-200 hover:shadow-md h-full"
    >
      <div>
        {/* Star Rating & Role Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: item.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="rounded-md bg-neutral-100 border border-neutral-200/60 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
            {item.role === "poster" ? "Task poster" : "Active helper"}
          </span>
        </div>

        {/* Quote */}
        <blockquote className="text-sm leading-relaxed text-neutral-700 mb-6">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      </div>

      {/* Author Info */}
      <figcaption className="flex items-center gap-3 pt-4 border-t border-neutral-100">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
          <Image
            src={item.avatarUrl}
            alt={item.author}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-neutral-900 truncate">
            {item.author}
          </div>
          <div className="text-xs text-neutral-500 truncate">
            <cite className="not-italic">{item.roleTitle}</cite> • {item.zone}
          </div>
        </div>
      </figcaption>
    </motion.figure>
  );
}
