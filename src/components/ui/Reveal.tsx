"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds — handy for grids of cards. */
  delay?: number;
  /** Direction the content animates in from. */
  direction?: "up" | "left" | "right" | "none";
  as?: "div" | "li";
};

const distance = 24;

function getVariants(direction: RevealProps["direction"], reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }

  const offset =
    direction === "up"
      ? { y: distance }
      : direction === "left"
        ? { x: -distance }
        : direction === "right"
          ? { x: distance }
          : {};

  return {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  };
}

/**
 * Fades/slides content into place as it scrolls into the viewport.
 * Falls back to a plain opacity fade (no motion) when the user has
 * requested reduced motion at the OS level.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={getVariants(direction, Boolean(reduced))}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
