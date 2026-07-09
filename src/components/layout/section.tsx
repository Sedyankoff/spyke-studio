"use client";

import { cn } from "@/lib/utils";
import { useSectionSpy } from "@/hooks/use-section-spy";
import type { SectionId } from "@/types";

interface SectionProps {
  id: SectionId;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  const ref = useSectionSpy(id);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative scroll-mt-28", className)}
    >
      {children}
    </section>
  );
}
