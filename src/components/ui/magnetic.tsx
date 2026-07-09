"use client";

import { useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** How strongly the element follows the pointer, 0–1. */
  strength?: number;
}

export function Magnetic({
  children,
  className,
  strength = 0.25,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(offsetY, { stiffness: 180, damping: 16, mass: 0.4 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    offsetX.set((event.clientX - rect.left - rect.width / 2) * strength);
    offsetY.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const handlePointerLeave = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </m.div>
  );
}
