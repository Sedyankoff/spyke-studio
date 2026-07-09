"use client";

import { philosophyStatement, principles } from "@/data/philosophy";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { StaggerGroup, StaggerItem } from "@/components/animations/stagger";

export function Philosophy() {
  return (
    <Section id="philosophy" className="py-28 sm:py-36 lg:py-44">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 border-y border-white/[0.05] bg-white/[0.014]"
      />
      <Container>
        <SectionHeading
          titleId="philosophy-title"
          eyebrow="02 — Engineering philosophy"
          title="How I think about software"
          align="center"
        />

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-3xl text-center font-serif text-2xl leading-snug text-balance text-foreground/90 italic sm:text-3xl">
            “{philosophyStatement}”
          </p>
        </Reveal>

        <StaggerGroup
          stagger={0.09}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {principles.map((principle, index) => (
            <StaggerItem key={principle.title}>
              <article className="group relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7 transition-colors duration-500 hover:border-white/[0.16] hover:bg-white/[0.03]">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="font-mono text-xs tracking-[0.2em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {principle.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
