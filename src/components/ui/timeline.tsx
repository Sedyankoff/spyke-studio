"use client";

import { useRef } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem } from "@/components/animations/stagger";
import type { TimelineEntry } from "@/types";

interface TimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

export function Timeline({ entries, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"],
  });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 90,
    damping: 28,
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[7px] w-px bg-white/[0.07]"
      />
      <m.span
        aria-hidden="true"
        style={{ scaleY: shouldReduceMotion ? 1 : scaleY }}
        className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-accent/70 via-accent/40 to-accent/10"
      />
      <ol className="space-y-14">
        {entries.map((entry) => (
          <li
            key={`${entry.period}-${entry.title}`}
            className="relative pl-10 sm:pl-14"
          >
            <span
              aria-hidden="true"
              className="absolute top-1 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent/50 bg-background"
            >
              <span className="h-[5px] w-[5px] rounded-full bg-accent" />
            </span>
            <StaggerGroup stagger={0.07}>
              <StaggerItem>
                <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
                  {entry.period}
                </p>
              </StaggerItem>
              <StaggerItem>
                <h3 className="mt-2.5 text-xl font-semibold tracking-tight text-foreground">
                  {entry.title}
                  {entry.subtitle && (
                    <span className="font-normal text-muted">
                      {" "}
                      · {entry.subtitle}
                    </span>
                  )}
                </h3>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {entry.description}
                </p>
              </StaggerItem>
              {entry.tags && entry.tags.length > 0 && (
                <StaggerItem className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </StaggerItem>
              )}
            </StaggerGroup>
          </li>
        ))}
      </ol>
    </div>
  );
}
