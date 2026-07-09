"use client";

import { experienceItems } from "@/data/experience";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/timeline";

export function Experience() {
  return (
    <Section id="experience" className="py-28 sm:py-36 lg:py-44">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              titleId="experience-title"
              eyebrow="05 — Experience"
              title="Where the work happened"
              lead="Short on entries, heavy on ownership — every role here meant carrying a product from architecture to launch."
            />
          </div>

          <Timeline
            entries={experienceItems.map((item) => ({
              period: item.period,
              title: item.role,
              subtitle: item.company,
              description: item.summary,
              tags: item.tags,
            }))}
          />
        </div>
      </Container>
    </Section>
  );
}
