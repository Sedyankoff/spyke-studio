"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/reveal";

interface SectionHeadingProps {
  /** The DOM id applied to the h2, referenced by the section's aria-labelledby. */
  titleId: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  titleId,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        centered && "flex flex-col items-center text-center",
        className,
      )}
    >
      <Reveal>
        <p
          className={cn(
            "flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-accent uppercase",
            centered && "justify-center",
          )}
        >
          <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
          {eyebrow}
          {centered && (
            <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
          )}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={titleId}
          className="mt-5 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl"
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg",
              centered && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
