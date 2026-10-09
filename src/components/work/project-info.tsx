"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "@/components/ui/tag";
import type { Dictionary } from "@/content/dictionary";
import type { Project, ProjectId } from "@/content/schema";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProjectInfoProps {
  projects: Project[];
  work: Dictionary["work"];
  activeId: ProjectId | null;
  hoverId: ProjectId | null;
  onOpen: (id: ProjectId) => void;
  onHover: (id: ProjectId | null) => void;
  className?: string;
}

/**
 * Everything that is read rather than looked at: the project index, which
 * doubles as a second way to open each one, and the open project's name,
 * description and technologies.
 */
export function ProjectInfo({
  projects,
  work,
  activeId,
  hoverId,
  onOpen,
  onHover,
  className,
}: ProjectInfoProps) {
  const active = projects.find((project) => project.id === activeId) ?? null;

  return (
    <div className={className}>
      <ul
        aria-label={work.eyebrow}
        className="grid grid-cols-2 gap-x-5 gap-y-1 sm:grid-cols-3 sm:gap-x-8"
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

      <AnimatePresence mode="wait" initial={false}>
        {active && (
          <m.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: EASE },
            }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <Details project={active} work={work} />
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
    <article
      aria-labelledby={`project-${project.id}`}
      className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-16"
    >
      <div>
        <h3 id={`project-${project.id}`} className="display-section text-paper">
          {copy.name}
        </h3>
      </div>

      <div className="lg:pt-1.5">
        <p className="body-lg max-w-2xl text-paper/70">{copy.description}</p>

        <ul aria-label={work.techLabel} className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Tag tone="paper">{tech}</Tag>
            </li>
          ))}
        </ul>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${work.visitSite}: ${project.urlLabel ?? project.url} (${work.newTab})`}
            className="group mt-8 inline-flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="inline-flex h-11 items-center gap-2 rounded-full border border-line-invert px-5 text-sm text-paper transition-colors duration-200 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
              {work.visitSite}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
            <span className="font-mono text-xs tracking-[0.1em] text-paper/50">
              {project.urlLabel ?? project.url}
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
