"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatPeriod } from "@/content";
import type { Dictionary } from "@/content/dictionary";
import type { Project, ProjectId } from "@/content/schema";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProjectInfoProps {
  projects: Project[];
  work: Dictionary["work"];
  present: string;
  activeId: ProjectId | null;
  hoverId: ProjectId | null;
  onOpen: (id: ProjectId) => void;
  onHover: (id: ProjectId | null) => void;
  className?: string;
}

/**
 * Everything that is read rather than looked at: the project index, which
 * doubles as a second way to open each one, and the open project's
 * specification.
 */
export function ProjectInfo({
  projects,
  work,
  present,
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
        className="grid grid-cols-2 gap-x-5 gap-y-1 sm:gap-x-8 lg:grid-cols-4"
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
                className="group relative w-full border-t border-line-invert pt-4 pb-5 text-left"
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
                    lit ? "text-paper" : "text-paper/50 group-hover:text-paper/80",
                  )}
                >
                  {copy.name}
                </span>
                <span className="meta mt-2.5 block text-paper/40">
                  {copy.category}
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
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <Specification project={active} work={work} present={present} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Specification({
  project,
  work,
  present,
}: {
  project: Project;
  work: Dictionary["work"];
  present: string;
}) {
  const copy = work.projects[project.id];
  const period = project.period && formatPeriod(project.period, present);

  return (
    <article
      aria-labelledby={`spec-${project.id}`}
      className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-16"
    >
      <div>
        <h3 id={`spec-${project.id}`} className="display-section text-paper">
          {copy.name}
        </h3>
        <p className="body-lg mt-5 max-w-md text-paper/65">{copy.summary}</p>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-3"
          >
            <span className="inline-flex h-11 items-center gap-2 rounded-full border border-line-invert px-5 text-sm text-paper transition-colors duration-200 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
              {work.openLive}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
            <span className="font-mono text-xs tracking-[0.1em] text-paper/45">
              {project.urlLabel ?? project.url}
            </span>
          </a>
        )}
      </div>

      <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line-invert pt-8 sm:grid-cols-3 lg:border-t-0 lg:pt-1">
        <Field label={work.categoryLabel}>{copy.category}</Field>
        <Field label={work.roleLabel}>{copy.roles.join(" · ")}</Field>
        <Field label={work.statusLabel} className="col-span-2 sm:col-span-1">
          {period && <span className="block">{period}</span>}
          <span className="block">{copy.status}</span>
        </Field>

        <Field label={work.techLabel} className="col-span-full">
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line-invert px-2.5 py-1 font-mono text-[11px] tracking-wide text-paper/70"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Field>

        <Field label={work.overviewLabel} className="col-span-full">
          <p className="body-base max-w-2xl text-paper/60">{copy.description}</p>
        </Field>
      </dl>
    </article>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="eyebrow text-paper/35">{label}</dt>
      <dd className="mt-3 text-sm leading-relaxed text-paper/85">{children}</dd>
    </div>
  );
}
