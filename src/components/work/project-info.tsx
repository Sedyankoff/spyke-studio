"use client";

import Image from "next/image";
import { AnimatePresence, m, type Variants } from "framer-motion";
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

/** Every logo covers about this many square units; see `ProjectLogo`. */
const LOGO_AREA = 1100;
/** …but a tall mark never grows past this height. */
const LOGO_MAX_HEIGHT = 28;

/**
 * A project's logo. The logos differ in shape — a wide wordmark, a tall
 * monogram — so sizing them by height alone would make the wordmarks loud and
 * the monogram tiny. Each is given the same area instead (its height capped),
 * which evens out their visual weight; the box hugs the artwork, so the name
 * always follows at the same distance.
 *
 * The unit (`--logo-u`, set by the caller) scales the whole set together.
 */
function ProjectLogo({
  project,
  sizes,
  className,
}: {
  project: Project;
  sizes: string;
  className?: string;
}) {
  const aspect = project.logo.width / project.logo.height;
  const height = Math.min(Math.sqrt(LOGO_AREA / aspect), LOGO_MAX_HEIGHT);
  const width = height * aspect;

  return (
    <span
      aria-hidden="true"
      className={cn("relative block shrink-0", className)}
      style={{
        width: `calc(var(--logo-u) * ${width.toFixed(1)})`,
        height: `calc(var(--logo-u) * ${height.toFixed(1)})`,
      }}
    >
      <Image
        src={project.logo.src}
        alt=""
        fill
        sizes={sizes}
        quality={90}
        className="object-contain"
      />
    </span>
  );
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
      className={cn("grid grid-cols-1 sm:grid-cols-3 sm:gap-x-8", className)}
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
              // Logo beside the name; stacked above it in the narrow three-column row of tablets.
              className="group relative flex min-h-14 w-full items-center gap-3.5 border-t border-line-invert py-3.5 text-left sm:min-h-16 sm:flex-col sm:items-start sm:gap-3 sm:pt-4 sm:pb-5 lg:flex-row lg:items-center lg:gap-4"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -top-px left-0 h-[2px] w-full origin-left bg-red transition-transform duration-500 ease-[var(--ease-spatial)]",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
              <ProjectLogo
                project={project}
                sizes="(min-width: 1024px) 64px, 56px"
                className={cn(
                  "transition-opacity duration-300 [--logo-u:0.875px] lg:[--logo-u:1px]",
                  lit ? "opacity-100" : "opacity-50 group-hover:opacity-80",
                )}
              />
              <span
                className={cn(
                  "block min-w-0 font-display text-xl leading-none font-semibold uppercase transition-colors duration-300 sm:text-[1.375rem] lg:text-2xl",
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

/*
 * Switching projects, in the direction of travel (`custom`: 1 = onwards).
 * The outgoing details slide away against it and fade quickly; the incoming
 * ones arrive along it in order — logo, then the name rising out of its
 * mask, then the description, technologies and link. Both share one grid
 * cell, so the column never collapses between them, and the outgoing panel
 * ignores the pointer while it leaves.
 */
const panel: Variants = {
  hidden: { opacity: 1 },
  shown: {
    opacity: 1,
    transition: { delayChildren: 0.14, staggerChildren: 0.07 },
  },
  gone: (direction: 1 | -1) => ({
    opacity: 0,
    x: -36 * direction,
    pointerEvents: "none",
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  }),
};

const piece: Variants = {
  hidden: (direction: 1 | -1) => ({ opacity: 0, x: 40 * direction }),
  shown: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const mark: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -8 },
  shown: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const rise: Variants = {
  hidden: { y: "108%" },
  shown: { y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Beside the devices: the project's name, what it is, what it is built with
 * and, when there is a public site, the way to it.
 */
export function ProjectDetails({
  project,
  direction,
  work,
  className,
}: {
  project: Project | null;
  /** The way the last change of project went: 1 = onwards. */
  direction: 1 | -1;
  work: Dictionary["work"];
  className?: string;
}) {
  return (
    <div className={cn("grid", className)}>
      <AnimatePresence initial={false} custom={direction}>
        {project && (
          <m.div
            key={project.id}
            custom={direction}
            variants={panel}
            initial="hidden"
            animate="shown"
            exit="gone"
            className="col-start-1 row-start-1"
          >
            <Details project={project} direction={direction} work={work} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Details({
  project,
  direction,
  work,
}: {
  project: Project;
  direction: 1 | -1;
  work: Dictionary["work"];
}) {
  const copy = work.projects[project.id];

  return (
    <article aria-labelledby={`project-${project.id}`}>
      <div className="flex items-center gap-4 sm:gap-5">
        <m.span variants={mark} className="block shrink-0">
          <ProjectLogo
            project={project}
            sizes="(min-width: 640px) 90px, 77px"
            className="[--logo-u:1.2px] sm:[--logo-u:1.4px]"
          />
        </m.span>
        {/* The name rises out of its own mask, like the hero's headline. */}
        <h3
          id={`project-${project.id}`}
          className="display-section -my-[0.12em] min-w-0 overflow-hidden py-[0.12em] text-[clamp(2rem,3.4vw,3rem)] text-paper"
        >
          <m.span variants={rise} className="block">
            {copy.name}
          </m.span>
        </h3>
      </div>

      <m.p
        custom={direction}
        variants={piece}
        className="body-base mt-5 max-w-xl text-paper/70 sm:text-base"
      >
        {copy.description}
      </m.p>

      <m.ul
        custom={direction}
        variants={piece}
        aria-label={work.techLabel}
        className="mt-6 flex flex-wrap gap-1.5"
      >
        {project.tech.map((tech) => (
          <li key={tech}>
            <Tag tone="paper">{tech}</Tag>
          </li>
        ))}
      </m.ul>

      {project.url && (
        <m.div custom={direction} variants={piece}>
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
        </m.div>
      )}
    </article>
  );
}
