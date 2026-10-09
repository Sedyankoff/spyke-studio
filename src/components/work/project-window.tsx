"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { LivePreview } from "@/components/work/live-preview";
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
  /** The live site to show ahead of the screenshots, when it may be framed here. */
  live: string | null;
  onLiveFail: () => void;
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
 * live site when it may be framed, then the desktop screenshots.
 */
export function ProjectWindow({
  project,
  copy,
  work,
  screens,
  live,
  onLiveFail,
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
  const liveActive = !!live && view === 0;
  const current = liveActive ? null : screens[view - offset];

  // Once opened, the frame stays mounted so stepping back doesn't reload it.
  const [liveMounted, setLiveMounted] = useState(false);
  if (liveActive && !liveMounted) setLiveMounted(true);

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
          A slim browser toolbar. Besides reading as a browser, it brings the
          content area close to the captures' own proportions (a full-HD
          browser viewport), so the screenshots lose almost nothing at the
          sides.
        */}
        <div
          aria-hidden="true"
          className="relative flex h-[6%] min-h-3 shrink-0 items-center border-b border-paper/5 bg-[#1a1816] px-[1.6%]"
        >
          <span className="flex h-full items-center gap-[0.35rem]">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="aspect-square h-[30%] rounded-full bg-paper/20"
              />
            ))}
          </span>
          <span className="absolute inset-x-[30%] top-1/2 hidden h-[62%] -translate-y-1/2 items-center justify-center gap-1.5 rounded-full bg-black/45 px-3 font-mono text-[10px] leading-none text-paper/55 sm:flex lg:text-[11px]">
            {liveActive && (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
            )}
            <span className="truncate">{project.urlLabel ?? copy.name}</span>
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
          {live && liveMounted && (
            <div
              aria-hidden={liveActive ? undefined : "true"}
              className={cn(
                "absolute inset-0 transition-[opacity,transform] duration-500 ease-[var(--ease-spatial)]",
                liveActive ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              style={{
                transform: `translate3d(${liveActive ? 0 : -3}%, 0, 0)`,
              }}
            >
              <LivePreview
                url={live}
                title={`${copy.name} — ${work.liveView}`}
                poster={screens[0]?.desktop}
                onFail={onLiveFail}
              />
            </div>
          )}
          {screens.map((screen, index) => {
            const i = index + offset;
            const shift = i === view ? 0 : i < view ? -1 : 1;

            return (
              <div
                key={screen.id}
                aria-hidden={shift === 0 ? undefined : "true"}
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
                  sizes="(min-width: 1280px) 1040px, (min-width: 640px) 84vw, 100vw"
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
