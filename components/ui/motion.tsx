"use client";

import React, { useSyncExternalStore } from "react";
import {
  motion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

const emptySubscribe = () => () => {};

export function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function useIsReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

/**
 * FadeIn
 * Subtle opacity and translateY entrance animation with configurable delay/duration.
 * Respects prefers-reduced-motion.
 */
export interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  viewportOnce?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.55,
  yOffset = 24,
  className,
  viewportOnce = true,
  style,
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useIsReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: viewportOnce, amount: 0.12 }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={
        shouldReduceMotion
          ? { opacity: 1, transform: "none", ...(style as React.CSSProperties) }
          : style
      }
      suppressHydrationWarning
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * SectionReveal
 * Classic full-section entrance reveal. Smoothly fades in and slides content up on scroll.
 */
export interface SectionRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  viewportOnce?: boolean;
}

export function SectionReveal({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 30,
  className,
  viewportOnce = true,
  style,
  ...props
}: SectionRevealProps) {
  const shouldReduceMotion = useIsReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: viewportOnce, amount: 0.1 }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={
        shouldReduceMotion
          ? { opacity: 1, transform: "none", ...(style as React.CSSProperties) }
          : style
      }
      suppressHydrationWarning
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer
 * Staggered children orchestration for card grids or multi-element sections.
 * Automatically coordinates with children using StaggerItem variants.
 */
export interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  viewportOnce?: boolean;
  animateImmediately?: boolean;
}

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay = 0.1) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05,
    },
  }),
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const reducedContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

export const reducedItemVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.05,
  className,
  viewportOnce = true,
  animateImmediately = false,
  style,
  ...props
}: StaggerContainerProps) {
  const shouldReduceMotion = useIsReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      },
    },
  };

  if (animateImmediately) {
    return (
      <motion.div
        variants={shouldReduceMotion ? reducedContainerVariants : containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        style={
          shouldReduceMotion
            ? { opacity: 1, transform: "none", ...(style as React.CSSProperties) }
            : style
        }
        suppressHydrationWarning
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedContainerVariants : containerVariants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: viewportOnce, amount: 0.1 }}
      style={
        shouldReduceMotion
          ? { opacity: 1, transform: "none", ...(style as React.CSSProperties) }
          : style
      }
      suppressHydrationWarning
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem
 * Child item for use inside StaggerContainer. Inherits variant triggers from parent container.
 */
export function StaggerItem({
  children,
  className,
  style,
  ...props
}: HTMLMotionProps<"div"> & { children: React.ReactNode; className?: string }) {
  const shouldReduceMotion = useIsReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedItemVariants : staggerItemVariants}
      style={
        shouldReduceMotion
          ? { opacity: 1, transform: "none", ...(style as React.CSSProperties) }
          : style
      }
      suppressHydrationWarning
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleOnHover
 * Spring physics on button hover and tap.
 * Default: whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
 */
export interface ScaleOnHoverProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  scale?: number;
  tapScale?: number;
  className?: string;
}

export function ScaleOnHover({
  children,
  scale = 1.04,
  tapScale = 0.96,
  className,
  ...props
}: ScaleOnHoverProps) {
  const shouldReduceMotion = useIsReducedMotion();

  return (
    <motion.div
      whileHover={{ scale: shouldReduceMotion ? 1 : scale }}
      whileTap={{ scale: shouldReduceMotion ? 1 : tapScale }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      suppressHydrationWarning
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * CardHover (and alias HoverCard)
 * Subtle upward lift on hover: whileHover={{ y: -4, transition: { duration: 0.2 } }}
 */
export interface CardHoverProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  yLift?: number;
  className?: string;
}

export function CardHover({
  children,
  yLift = -5,
  className,
  ...props
}: CardHoverProps) {
  const shouldReduceMotion = useIsReducedMotion();

  return (
    <motion.div
      whileHover={{ y: shouldReduceMotion ? 0 : yLift }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      suppressHydrationWarning
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const HoverCard = CardHover;

/**
 * GentleFloat
 * Subtle continuous floating animation for mockups or visual elements.
 */
export function GentleFloat({
  children,
  className,
  style,
  ...props
}: HTMLMotionProps<"div"> & { children: React.ReactNode; className?: string }) {
  const shouldReduceMotion = useIsReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: [0, -6, 0],
            }
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      style={
        shouldReduceMotion
          ? { transform: "none", ...(style as React.CSSProperties) }
          : style
      }
      suppressHydrationWarning
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * PulsingBorderGlow
 * Subtle pulsing ring/glow effect for featured items (e.g. 0% Launch Special card).
 */
export function PulsingBorderGlow({
  children,
  className,
  style,
  ...props
}: HTMLMotionProps<"div"> & { children: React.ReactNode; className?: string }) {
  const shouldReduceMotion = useIsReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? undefined
          : {
              boxShadow: [
                "0 0 20px 0px rgba(204, 255, 0, 0.2)",
                "0 0 35px 4px rgba(204, 255, 0, 0.4)",
                "0 0 20px 0px rgba(204, 255, 0, 0.2)",
              ],
            }
      }
      transition={{
        duration: 2.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      style={style}
      suppressHydrationWarning
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
