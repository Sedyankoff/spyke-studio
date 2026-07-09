"use client";

import { journeySteps } from "@/data/journey";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/timeline";
import { Reveal } from "@/components/animations/reveal";

export function About() {
  return (
    <Section id="about" className="py-28 sm:py-36 lg:py-44">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              titleId="about-title"
              eyebrow="01 — About"
              title="The journey so far"
              lead="Not a biography — a trajectory. How curiosity became a craft, and a craft became a studio."
            />
            <Reveal delay={0.24}>
              <blockquote className="mt-10 max-w-sm border-l border-accent/40 pl-5 font-serif text-xl leading-snug text-foreground/85 italic">
                “Everything here was built the way I want software to feel —
                deliberate.”
              </blockquote>
            </Reveal>
          </div>

          <Timeline
            entries={journeySteps.map((step) => ({
              period: step.period,
              title: step.title,
              description: step.description,
            }))}
          />
        </div>
      </Container>
    </Section>
  );
}
