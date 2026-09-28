"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { LivePreview } from "@/components/work/live-preview";
import { SystemDiagram } from "@/components/work/system-diagram";
import type { Dictionary } from "@/content/dictionary";
import type { Project, ProjectCopy, ProjectImage } from "@/content/schema";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProjectWindowProps {
  project: Project;
  copy: ProjectCopy;
  work: Dictionary["work"];
  /** The project's desktop screenshots, in order. */
  views: ProjectImage[];
  /** The live site to show ahead of the screenshots, when it may be framed here. */
  live: string | null;
  onLiveFail: () => void;
  origin: string;
  view: number;
  /** Take focus on mount — only when the reader opened it, never on page load. */
  focusOnOpen: boolean;
  onView: (view: number) => void;
  onClose: () => void;
}

/**
 * An application window on the Spyke desktop. It grows out of its icon to
 * fill the screen and shrinks back into it; inside is the real product — the
 * desktop screenshots, stepped through like an image viewer, or for a system
 * with no interface to show, the path its data takes.
 */
export function ProjectWindow({
  project,
  copy,
  work,
  views,
  live,
  onLiveFail,
  origin,
  view,
  focusOnOpen,
  onView,
  onClose,
}: ProjectWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const swipeRef = useRef<number | null>(null);
  const titleId = `window-${project.id}`;

  // The live site, when there is one, is the first view; screenshots follow.
  const offset = live ? 1 : 0;
  const count = views.length + offset;
  const liveActive = !!live && view === 0;
  const current = liveActive ? null : views[view - offset];

  // Once opened, the frame stays mounted so stepping back doesn't reload it.
  const [liveMounted, setLiveMounted] = useState(false);
  if (liveActive && !liveMounted) setLiveMounted(true);

  useEffect(() => {
    if (focusOnOpen) windowRef.current?.focus({ preventScroll: true });
    // Mount only: focus is taken once, when the window opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = (delta: number) => {
    if (count > 1) onView((view + delta + count) % count);
  };

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { duration: 0.46, ease: EASE },
      }}
      exit={{
        opacity: 0,
        scale: 0.1,
        transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
      }}
      style={{ transformOrigin: origin }}
      className="absolute inset-0 z-20"
    >
      <div
        ref={windowRef}
        role="region"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") step(-1);
          if (event.key === "ArrowRight") step(1);
        }}
        className="flex h-full flex-col overflow-hidden bg-[#0f0e0c] outline-none"
      >
        {/* Title bar --------------------------------------------------- */}
        <div className="flex h-8 shrink-0 items-center gap-2.5 border-b border-line-invert-soft bg-[#191715] pr-1 pl-2.5 lg:h-9 lg:pl-3">
          <span
            aria-hidden="true"
            className="flex h-5 min-w-5 items-center justify-center rounded-[5px] bg-paper/10 px-1 font-display text-[9px] font-semibold text-paper/80"
          >
            {project.glyph}
          </span>
          <p
            id={titleId}
            className="min-w-0 truncate font-mono text-[10px] tracking-[0.12em] text-paper/85 uppercase lg:text-[11px]"
          >
            <span className="max-sm:sr-only">{copy.name}</span>
            {(current || liveActive) && (
              <span className="text-paper/45">
                <span aria-hidden="true" className="max-sm:hidden">
                  {" — "}
                </span>
                {liveActive
                  ? work.liveView
                  : current && copy.images[current.id]?.label}
              </span>
            )}
          </p>

          <div className="ml-auto flex shrink-0 items-center gap-0.5">
            {count > 1 && (
              <>
                <span
                  aria-live="polite"
                  className="mr-1.5 font-mono text-[10px] tracking-[0.12em] text-paper/45 tabular-nums"
                >
                  {view + 1} / {count}
                </span>
                <WindowButton label={work.previousImage} onClick={() => step(-1)}>
                  <ChevronLeft className="h-3.5 w-3.5" />
                </WindowButton>
                <WindowButton label={work.nextImage} onClick={() => step(1)}>
                  <ChevronRight className="h-3.5 w-3.5" />
                </WindowButton>
                <span
                  aria-hidden="true"
                  className="mx-1 h-3.5 w-px bg-line-invert"
                />
              </>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${work.openLive}: ${project.urlLabel ?? project.url}`}
                title={work.openLive}
                className="flex h-6 w-6 items-center justify-center rounded-md text-paper/60 transition-colors duration-200 hover:bg-paper hover:text-ink lg:h-7 lg:w-7"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            <WindowButton label={work.closeProject} onClick={onClose}>
              <X className="h-3.5 w-3.5" />
            </WindowButton>
          </div>
        </div>

        {/* Content ----------------------------------------------------- */}
        <div
          className="relative min-h-0 flex-1 touch-pan-y overflow-hidden bg-[#0c0b0a]"
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse") swipeRef.current = event.clientX;
          }}
          onPointerUp={(event) => {
            const start = swipeRef.current;
            swipeRef.current = null;
            if (start === null) return;
            const delta = event.clientX - start;
            if (Math.abs(delta) > 40) step(delta < 0 ? 1 : -1);
          }}
        >
          {count === 0 ? (
            <SystemDiagram
              label={work.dataPathLabel}
              steps={work.dataPath}
              className="absolute inset-0 overflow-y-auto rounded-none border-0"
            />
          ) : (
            <>
            {live && liveMounted && (
              <div
                aria-hidden={liveActive ? undefined : "true"}
                className={cn(
                  "absolute inset-0 transition-[opacity,transform] duration-500 ease-[var(--ease-spatial)]",
                  liveActive ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                style={{ transform: `translate3d(${liveActive ? 0 : -3}%, 0, 0)` }}
              >
                <LivePreview
                  url={live}
                  title={`${copy.name} — ${work.liveView}`}
                  poster={views[0]}
                  onFail={onLiveFail}
                />
              </div>
            )}
            {views.map((image, index) => {
              const i = index + offset;
              const shift = i === view ? 0 : i < view ? -1 : 1;

              return (
                <div
                  key={image.id}
                  aria-hidden={shift === 0 ? undefined : "true"}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-500 ease-[var(--ease-spatial)]",
                    shift === 0 ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                  style={{ transform: `translate3d(${shift * 3}%, 0, 0)` }}
                >
                  <Image
                    src={image.src}
                    alt={copy.images[image.id]?.alt ?? ""}
                    fill
                    sizes="(min-width: 1280px) 1040px, (min-width: 640px) 84vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              );
            })}
            </>
          )}
        </div>
      </div>
    </m.div>
  );
}

function WindowButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-6 w-6 items-center justify-center rounded-md text-paper/60 transition-colors duration-200 hover:bg-paper hover:text-ink lg:h-7 lg:w-7"
    >
      {children}
    </button>
  );
}
