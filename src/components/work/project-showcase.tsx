"use client";

import { useCallback, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/work/project-visual";
import { formatPeriod } from "@/content";
import type { Dictionary } from "@/content/dictionary";
import type { Project, ProjectCopy } from "@/content/schema";
import { cn } from "@/lib/utils";

interface ProjectShowcaseProps {
  project: Project;
  copy: ProjectCopy;
  work: Dictionary["work"];
  present: string;
  index: number;
  onOpen: () => void;
}

const MAX_TECH = 6;

export function ProjectShowcase({
  project,
  copy,
  work,
  present,
  index,
  onOpen,
}: ProjectShowcaseProps) {
  const visualRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  /** Pointer parallax — fine pointers only, and never against reduced motion. */
  const onPointerMove = useCallback((event: React.PointerEvent) => {
    const node = visualRef.current;
    if (!node || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { clientX, clientY } = event;
    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const rect = node.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--px", `${(x * 14).toFixed(2)}px`);
      node.style.setProperty("--py", `${(y * 10).toFixed(2)}px`);
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    const node = visualRef.current;
    if (!node) return;
    node.style.setProperty("--px", "0px");
    node.style.setProperty("--py", "0px");
  }, []);

  const visibleTech = project.tech.slice(0, MAX_TECH);
  const remaining = project.tech.length - visibleTech.length;
  const number = String(index + 1).padStart(2, "0");
  const period = project.period
    ? formatPeriod(project.period, present)
    : undefined;

  return (
    <li className="archive-item group relative">
      {/* Index rule ------------------------------------------------------- */}
      <div
        data-reveal="line"
        className="h-px w-full origin-left bg-line-invert"
      />

      <div className="flex items-start justify-between gap-6 pt-5 sm:pt-6">
        <div data-reveal="up">
          <p className="meta text-paper/40">{work.indexLabel}</p>
          <p className="display-index mt-2 text-red">{number}</p>
        </div>

        <div data-reveal="up" data-rd="1" className="pt-1 text-right">
          <p className="meta text-paper/70">{copy.category}</p>
          <p className="meta mt-2 flex items-center justify-end gap-2 text-paper/40">
            {period && <span>{period}</span>}
            <span aria-hidden="true" className="text-paper/20">
              /
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-red"
              />
              {copy.status}
            </span>
          </p>
        </div>
      </div>

      {/* Visual ----------------------------------------------------------- */}
      <div
        className={cn(
          "relative mt-9 pb-12 sm:mt-12 sm:pb-14 lg:pb-16",
          index % 2 === 0 ? "lg:pr-[7%]" : "lg:pl-[7%]",
        )}
      >
        <div
          ref={visualRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          data-reveal="scale"
          className="relative transition-transform duration-500 ease-[var(--ease-swift)] [transform:translate3d(var(--px,0px),var(--py,0px),0)]"
        >
          <ProjectVisual
            project={project}
            copy={copy}
            work={work}
            eager={index === 0}
          />

          <button
            type="button"
            onClick={onOpen}
            aria-label={`${work.open}: ${copy.name}`}
            className="absolute inset-0 z-30 cursor-pointer rounded-xl"
          />
        </div>
      </div>

      {/* Title and specification ------------------------------------------ */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <div data-reveal="up">
          <h3 className="display-section text-paper">{copy.name}</h3>
          <p className="body-lg mt-4 max-w-lg text-paper/60">{copy.summary}</p>

          <button
            type="button"
            onClick={onOpen}
            className="group/cta mt-8 inline-flex items-center gap-3.5"
          >
            <span
              aria-hidden="true"
              className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-line-invert text-paper transition-colors duration-300 group-hover/cta:border-red"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-red transition-transform duration-[400ms] ease-[var(--ease-spatial)] group-hover/cta:scale-100" />
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </span>
            <span className="meta text-paper/70 transition-colors duration-200 group-hover/cta:text-paper">
              {work.viewCase}
            </span>
          </button>
        </div>

        <dl
          data-reveal="up"
          data-rd="1"
          className="grid grid-cols-2 gap-x-8 gap-y-7 self-start border-t border-line-invert pt-7 lg:mt-2"
        >
          <div>
            <dt className="eyebrow text-paper/35">{work.roleLabel}</dt>
            <dd className="mt-2.5 space-y-1">
              {copy.roles.map((role) => (
                <p key={role} className="text-sm text-paper/85">
                  {role}
                </p>
              ))}
            </dd>
          </div>

          <div>
            <dt className="eyebrow text-paper/35">{work.categoryLabel}</dt>
            <dd className="mt-2.5 text-sm text-paper/85">{copy.category}</dd>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-red-light"
              >
                {project.urlLabel ?? project.url}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
          </div>

          <div className="col-span-2">
            <dt className="eyebrow text-paper/35">{work.techLabel}</dt>
            <dd className="mt-3 flex flex-wrap gap-1.5">
              {visibleTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-line-invert px-2.5 py-1 font-mono text-[11px] tracking-wide text-paper/70 transition-colors duration-200 hover:border-paper/45 hover:text-paper"
                >
                  {tech}
                </span>
              ))}
              {remaining > 0 && (
                <span className="px-1.5 py-1 font-mono text-[11px] tracking-wide text-paper/40">
                  +{remaining}
                </span>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </li>
  );
}
