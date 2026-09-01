"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { SystemDiagram } from "@/components/work/system-diagram";
import { PhoneFrame } from "@/components/work/device-frame";
import { Container } from "@/components/ui/container";
import { formatPeriod } from "@/content";
import { projects } from "@/content/projects";
import type { Dictionary } from "@/content/dictionary";
import type { Project, ProjectCopy } from "@/content/schema";
import { cn } from "@/lib/utils";

interface ProjectDetailProps {
  project: Project;
  copy: ProjectCopy;
  work: Dictionary["work"];
  present: string;
  onClose: () => void;
}

export function ProjectDetail({
  project,
  copy,
  work,
  present,
  onClose,
}: ProjectDetailProps) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const shell = document.getElementById("site-shell");
    const header = document.getElementById("site-header");

    document.documentElement.classList.add("command-scroll-lock");
    shell?.setAttribute("inert", "");
    header?.setAttribute("inert", "");
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.documentElement.classList.remove("command-scroll-lock");
      shell?.removeAttribute("inert");
      header?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const active = project.images[index];
  const period = project.period
    ? formatPeriod(project.period, present)
    : undefined;
  const phone = project.images.find((image) => image.kind === "mobile");

  return (
    <m.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`detail-${project.id}`}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      exit={{ clipPath: "inset(100% 0 0 0)" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-paper"
    >
      {/* Chrome ------------------------------------------------------------ */}
      <div className="sticky top-0 z-20 border-b border-line-invert-soft bg-ink/92 text-paper backdrop-blur-md">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red to-transparent"
        />
        <Container className="flex items-center justify-between gap-4 py-3.5">
          <p className="flex min-w-0 items-baseline gap-3">
            <span className="meta shrink-0 text-red-light">
              {work.indexLabel} {projectNumber(project.id)}
            </span>
            <span className="truncate font-display text-xl font-semibold uppercase sm:text-2xl">
              {copy.name}
            </span>
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={work.closeProject}
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-invert text-paper/70 transition-colors duration-200 hover:border-red hover:bg-red hover:text-paper"
          >
            <X className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:rotate-90" />
          </button>
        </Container>
      </div>

      {/* Masthead ---------------------------------------------------------- */}
      <div className="relative overflow-hidden bg-ink text-paper">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="blueprint absolute inset-0 opacity-40" />
          <div className="grain absolute inset-0 opacity-[0.04]" />
        </div>

        <Container className="relative pt-14 pb-16 sm:pt-16 lg:pt-20">
          <div className="animate-rise flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="meta text-paper/70">{copy.category}</span>
            {period && (
              <>
                <span aria-hidden="true" className="meta text-paper/20">
                  /
                </span>
                <span className="meta text-paper/45">{period}</span>
              </>
            )}
            <span aria-hidden="true" className="meta text-paper/20">
              /
            </span>
            <span className="meta inline-flex items-center gap-2 text-paper/45">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-red"
              />
              {copy.status}
            </span>
          </div>

          <h1
            id={`detail-${project.id}`}
            className="animate-rise display-section mt-5 [animation-delay:80ms]"
          >
            {copy.name}
          </h1>
          <p className="animate-rise body-lg mt-5 max-w-2xl text-paper/65 [animation-delay:160ms]">
            {copy.summary}
          </p>

          {/* Primary view -------------------------------------------------- */}
          <div className="animate-rise relative mt-12 [animation-delay:240ms] sm:mt-14">
            {active ? (
              <div className="relative overflow-hidden rounded-xl border border-line-invert bg-[#141210] shadow-[0_50px_120px_-50px_rgb(0_0_0/0.95)]">
                <div className="grid h-10 grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-line-invert-soft bg-paper/[0.03] px-4">
                  <span aria-hidden="true" className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-paper/15" />
                    <span className="h-2 w-2 rounded-full bg-paper/15" />
                    <span className="h-2 w-2 rounded-full bg-paper/15" />
                  </span>
                  <span className="truncate rounded-md bg-paper/[0.05] px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-paper/45">
                    {project.urlLabel ?? copy.images[active.id]?.label}
                  </span>
                  <span />
                </div>

                <div
                  className="relative"
                  style={{
                    aspectRatio: `${active.width} / ${active.height}`,
                  }}
                >
                  {project.images.map((image, i) => (
                    <Image
                      key={image.id}
                      src={image.src}
                      alt={copy.images[image.id]?.alt ?? ""}
                      fill
                      sizes="(min-width: 1024px) 76vw, 92vw"
                      aria-hidden={i === index ? undefined : "true"}
                      className={cn(
                        "object-contain transition-opacity duration-[400ms] ease-[var(--ease-swift)]",
                        image.kind === "desktop" && "object-top",
                        i === index ? "opacity-100" : "opacity-0",
                      )}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <SystemDiagram
                label={work.dataPathLabel}
                steps={work.dataPath}
                className="min-h-[20rem]"
              />
            )}
          </div>

          {/* Gallery ------------------------------------------------------- */}
          {project.images.length > 1 && (
            <div className="animate-rise mt-5 [animation-delay:320ms]">
              <h2 className="sr-only">{work.galleryLabel}</h2>
              <ul className="flex gap-2.5 overflow-x-auto pb-1">
                {project.images.map((image, i) => (
                  <li key={image.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-current={i === index ? "true" : undefined}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-full border px-3.5 py-2 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-200",
                        i === index
                          ? "border-red bg-red/10 text-paper"
                          : "border-line-invert text-paper/45 hover:border-paper/40 hover:text-paper",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors duration-200",
                          i === index
                            ? "bg-red"
                            : "bg-paper/25 group-hover:bg-paper/50",
                        )}
                      />
                      {copy.images[image.id]?.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </div>

      {/* Case study body ---------------------------------------------------- */}
      <Container className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-20 lg:py-20">
        <div>
          <h2 className="eyebrow text-red-deep">{work.overviewLabel}</h2>
          <p className="body-lg mt-6 max-w-2xl text-ink">{copy.description}</p>
        </div>

        <div className="space-y-9">
          <div>
            <h2 className="eyebrow text-ink-mute">{work.roleLabel}</h2>
            <ul className="mt-3.5 space-y-2">
              {copy.roles.map((role, i) => (
                <li
                  key={role}
                  className="flex items-baseline gap-3 border-b border-line pb-2 text-[15px] text-ink"
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-ink-mute">{work.techLabel}</h2>
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-ink-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {project.url && (
            <div>
              <h2 className="eyebrow text-ink-mute">{work.liveLabel}</h2>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3.5 inline-flex items-center gap-3 rounded-full bg-ink py-2.5 pr-3 pl-5 text-sm text-paper transition-colors duration-200 hover:bg-red"
              >
                {project.urlLabel ?? project.url}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/10">
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </div>
          )}

          {phone && (
            <div className="hidden lg:block">
              <h2 className="eyebrow text-ink-mute">
                {copy.images[phone.id]?.label}
              </h2>
              <PhoneFrame
                image={phone}
                alt={copy.images[phone.id]?.alt}
                sizes="14rem"
                className="mt-4 w-[13rem]"
              />
            </div>
          )}
        </div>
      </Container>
    </m.div>
  );
}

/** Padded 1-based position of a project, matching the showcase index. */
function projectNumber(id: string) {
  const position = projects.findIndex((project) => project.id === id) + 1;
  return String(position).padStart(2, "0");
}
