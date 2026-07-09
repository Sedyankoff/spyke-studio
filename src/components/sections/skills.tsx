"use client";

import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { StaggerGroup, StaggerItem } from "@/components/animations/stagger";

export function Skills() {
  return (
    <Section id="skills" className="py-28 sm:py-36 lg:py-44">
      <Container>
        <SectionHeading
          titleId="skills-title"
          eyebrow="03 — Capabilities"
          title="Tools chosen with intent"
          lead="Not a wall of logos — the technologies I reach for and why. Highlighted items are the daily drivers."
        />

        <div className="mt-16 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {skillGroups.map((group) => (
            <StaggerGroup
              key={group.category}
              stagger={0.05}
              className="grid gap-6 py-10 lg:grid-cols-[15rem_1fr] lg:gap-14"
            >
              <StaggerItem>
                <h3 className="font-mono text-xs tracking-[0.25em] text-foreground uppercase">
                  {group.category}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-faint">
                  {group.focus}
                </p>
              </StaggerItem>
              <StaggerItem className="flex flex-wrap content-start gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-colors duration-300",
                      skill.core
                        ? "border-white/[0.16] bg-white/[0.04] text-foreground"
                        : "border-white/[0.07] text-muted hover:border-white/[0.16] hover:text-foreground",
                    )}
                  >
                    {skill.core && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                      />
                    )}
                    {skill.name}
                  </span>
                ))}
              </StaggerItem>
            </StaggerGroup>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            Core stack
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
