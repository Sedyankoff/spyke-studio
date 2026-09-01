"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { ProjectShowcase } from "@/components/work/project-showcase";
import { ProjectDetail } from "@/components/work/project-detail";
import { projects } from "@/content/projects";
import type { Dictionary } from "@/content/dictionary";
import type { ProjectId } from "@/content/schema";

const emptySubscribe = () => () => {};

interface WorkProps {
  copy: Dictionary["work"];
  present: string;
}

export function Work({ copy, present }: WorkProps) {
  const [openId, setOpenId] = useState<ProjectId | null>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const openProject = openId
    ? (projects.find((project) => project.id === openId) ?? null)
    : null;

  return (
    <Section
      id="work"
      labelledBy="work-title"
      className="section-y overflow-hidden bg-ink text-paper"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grain absolute inset-0 opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red/50 to-transparent" />
      </div>

      <Container className="relative">
        <SectionIntro
          titleId="work-title"
          index="03"
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
          tone="paper"
        />

        <ul className="mt-16 space-y-24 sm:mt-20 sm:space-y-28 lg:space-y-40">
          {projects.map((project, index) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              copy={copy.projects[project.id]}
              work={copy}
              present={present}
              index={index}
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </ul>
      </Container>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {openProject && (
              <ProjectDetail
                key={openProject.id}
                project={openProject}
                copy={copy.projects[openProject.id]}
                work={copy}
                present={present}
                onClose={() => setOpenId(null)}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </Section>
  );
}
