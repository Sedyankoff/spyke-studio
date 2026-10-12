"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { SpykeLogo } from "@/components/brand/spyke-logo";
import {
  BAR_HEIGHT,
  MONITOR_SIZES,
  SCREEN_QUALITY,
} from "@/components/work/screen-sizes";
import type { Dictionary } from "@/content/dictionary";
import type { Project, ProjectCopy, ProjectScreen } from "@/content/schema";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProjectWindowProps {
  project: Project;
  copy: ProjectCopy;
  work: Dictionary["work"];
  /** The project's screens, in order; the window shows their desktop capture. */
  screens: ProjectScreen[];
  /**
   * Whether the live site comes ahead of the screenshots. The frame itself
   * belongs to the workstation, so it survives this window closing.
   */
  live: boolean;
  origin: string;
  view: number;
  /** Take focus on mount — only when the reader opened it, never on page load. */
  focusOnOpen: boolean;
  /** Previous / next: through this project's screens, then on to the next project. */
  onStep: (delta: 1 | -1) => void;
}

/**
 * An application window on the Spyke desktop. It grows out of its icon to
 * fill the screen and shrinks back into it; inside is the real product — the
 * desktop screenshots, under the live site when it may be framed.
 */
export function ProjectWindow({
  project,
  copy,
  work,
  screens,
  live,
  origin,
  view,
  focusOnOpen,
  onStep,
}: ProjectWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const swipeRef = useRef<number | null>(null);
  const titleId = `window-${project.id}`;

  // The live site, when there is one, is the first view; screenshots follow.
  const offset = live ? 1 : 0;
  const count = screens.length + offset;
  const liveActive = live && view === 0;
  const current = liveActive ? null : screens[view - offset];
  // Under the live site, the first screen holds the window until it loads.
  const shown = Math.max(view - offset, 0);

  useEffect(() => {
    if (focusOnOpen) windowRef.current?.focus({ preventScroll: true });
    // Mount only: focus is taken once, when the window opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          if (event.key === "ArrowLeft") onStep(-1);
          if (event.key === "ArrowRight") onStep(1);
        }}
        className="flex h-full flex-col overflow-hidden bg-[#0f0e0c] outline-none"
      >
        <p id={titleId} className="sr-only">
          {copy.name}
          {liveActive
            ? ` — ${work.liveView}`
            : current && ` — ${copy.screens[current.id]?.label ?? ""}`}
        </p>
        {count > 1 && (
          <p aria-live="polite" className="sr-only">
            {view + 1} / {count}
          </p>
        )}

        {/*
          A minimal browser bar: quiet window controls and the Spyke Studio
          logo, centred. Its height is fixed, and the content below has the
          captures' own proportions.
        */}
        <div
          aria-hidden="true"
          className={cn(
            "relative flex shrink-0 items-center border-b border-paper/[0.06] bg-[#171513] px-2.5 sm:px-3",
            BAR_HEIGHT,
          )}
        >
          <span className="flex items-center gap-1 sm:gap-1.5">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-1.5 w-1.5 rounded-full bg-paper/15 lg:h-2 lg:w-2"
              />
            ))}
          </span>
          <span className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center py-1.5 lg:py-2">
            <SpykeLogo tone="paper" sizes="64px" className="opacity-80" />
          </span>
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
            if (Math.abs(delta) > 40) onStep(delta < 0 ? 1 : -1);
          }}
        >
          {screens.map((screen, index) => {
            const shift = index === shown ? 0 : index < shown ? -1 : 1;

            return (
              <div
                key={screen.id}
                aria-hidden={shift === 0 && !liveActive ? undefined : "true"}
                className={cn(
                  "absolute inset-0 transition-[opacity,transform] duration-500 ease-[var(--ease-spatial)]",
                  shift === 0 ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                style={{ transform: `translate3d(${shift * 3}%, 0, 0)` }}
              >
                <Image
                  src={screen.desktop.src}
                  alt={copy.screens[screen.id]?.alt ?? ""}
                  fill
                  sizes={MONITOR_SIZES}
                  quality={SCREEN_QUALITY}
                  className="object-cover object-top"
                />
              </div>
            );
          })}
        </div>
      </div>
    </m.div>
  );
}
