"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Total vertical drift in pixels across the element's scroll range. */
  amount?: number;
}

export function Parallax({ children, className, amount = 40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <m.div
      ref={ref}
      style={{ y: shouldReduceMotion ? 0 : y }}
      className={className}
    >
      {children}
    </m.div>
  );
}
