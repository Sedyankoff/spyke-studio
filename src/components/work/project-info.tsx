"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import type { Dictionary } from "@/content/dictionary";
import type { Project, ProjectId } from "@/content/schema";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProjectIndexProps {
  projects: Project[];
  work: Dictionary["work"];
  activeId: ProjectId | null;
  hoverId: ProjectId | null;
  onOpen: (id: ProjectId) => void;
  onHover: (id: ProjectId | null) => void;
  className?: string;
}

/** The project index: a second way to open each project, above the showcase. */
export function ProjectIndex({
  projects,
  work,
  activeId,
  hoverId,
  onOpen,
  onHover,
  className,
}: ProjectIndexProps) {
  return (
    <ul
      aria-label={work.eyebrow}
      className={cn(
        "grid grid-cols-2 gap-x-5 gap-y-1 sm:grid-cols-3 sm:gap-x-8",
        className,
      )}
    >
      {projects.map((project) => {
        const copy = work.projects[project.id];
        const selected = project.id === activeId;
        const lit = selected || hoverId === project.id;

        return (
          <li key={project.id}>
            <button
              type="button"
              onClick={() => onOpen(project.id)}
              onMouseEnter={() => onHover(project.id)}
              onMouseLeave={() => onHover(null)}
              aria-pressed={selected}
              className="group relative flex min-h-14 w-full items-start border-t border-line-invert pt-4 pb-5 text-left"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -top-px left-0 h-[2px] w-full origin-left bg-red transition-transform duration-500 ease-[var(--ease-spatial)]",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
              <span
                className={cn(
                  "block font-display text-xl leading-none font-semibold uppercase transition-colors duration-300 sm:text-2xl",
                  lit
                    ? "text-paper"
                    : "text-paper/55 group-hover:text-paper/80",
                )}
              >
                {copy.name}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Beside the devices: the project's name, what it is, what it is built with
 * and, when there is a public site, the way to it.
 */
export function ProjectDetails({
  project,
  work,
  className,
}: {
  project: Project | null;
  work: Dictionary["work"];
  className?: string;
}) {
  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {project && (
          <m.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: EASE },
            }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <Details project={project} work={work} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Details({
  project,
  work,
}: {
  project: Project;
  work: Dictionary["work"];
}) {
  const copy = work.projects[project.id];

  return (
    <article aria-labelledby={`project-${project.id}`}>
      <h3
        id={`project-${project.id}`}
        className="display-section text-[clamp(2rem,3.4vw,3rem)] text-paper"
      >
        {copy.name}
      </h3>

      <p className="body-base mt-5 max-w-xl text-paper/70 sm:text-base">
        {copy.description}
      </p>

      <ul aria-label={work.techLabel} className="mt-6 flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <li key={tech}>
            <Tag tone="paper">{tech}</Tag>
          </li>
        ))}
      </ul>

      {project.url && (
        <ButtonLink
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${work.visitSite}: ${project.urlLabel ?? copy.name} (${work.newTab})`}
          variant="ghost"
          size="md"
          className="mt-8 hover:bg-paper/[0.06] active:bg-paper/10"
        >
          {work.visitSite}
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.75}
            className="h-4 w-4 text-red transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </ButtonLink>
      )}
    </article>
  );
}
