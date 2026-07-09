"use client";

import { m } from "framer-motion";
import { fadeRise, staggerChildren } from "@/lib/motion";

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: StaggerGroupProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={staggerChildren(stagger, delay)}
      className={className}
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
}

export function StaggerItem({ children, className, y = 24 }: StaggerItemProps) {
  return (
    <m.div variants={fadeRise(y)} className={className}>
      {children}
    </m.div>
  );
}
