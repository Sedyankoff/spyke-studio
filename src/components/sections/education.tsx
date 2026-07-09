"use client";

import { educationItems } from "@/data/education";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/animations/reveal";

export function Education() {
  return (
    <Section id="education" className="pb-28 sm:pb-36 lg:pb-44">
      <Container>
        <SectionHeading
          titleId="education-title"
          eyebrow="06 — Education"
          title="Learning, formal and otherwise"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {educationItems.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.12}
              className={cn(
                index === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-16",
              )}
            >
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] p-8 transition-colors duration-500 hover:border-white/[0.15] sm:p-10">
                <span
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/[0.06] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                />
                <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
                  {item.period}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 font-serif text-lg text-foreground/75 italic">
                  {item.institution}
                </p>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {item.focus.map((area) => (
                    <Badge key={area}>{area}</Badge>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
