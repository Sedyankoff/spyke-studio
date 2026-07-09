"use client";

import { projects } from "@/data/projects";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectPanel } from "@/components/sections/project-panel";

export function Projects() {
  return (
    <Section id="projects">
      <Container className="pt-28 pb-16 sm:pt-36 lg:pt-44 lg:pb-24">
        <SectionHeading
          titleId="projects-title"
          eyebrow="04 — Selected work"
          title="Built to ship. Shipped to last."
          lead="Three products in production — a commerce platform, a brand storefront and a booking experience. Each one designed, engineered and delivered end to end."
          align="center"
        />
      </Container>

      <div className="relative">
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </Section>
  );
}
