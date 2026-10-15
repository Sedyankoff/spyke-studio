"use client";

import { AnimatePresence } from "framer-motion";
import { SpykeLogo, SpykeMark } from "@/components/brand/spyke-logo";
import { LiveFrames, type LiveFrame } from "@/components/work/live-frames";
import { ProjectWindow } from "@/components/work/project-window";
import {
  CAPTURE_ASPECT,
  DESKTOP_VIEWPORT,
  MONITOR_SIZES,
} from "@/components/work/screen-sizes";
import type { Dictionary } from "@/content/dictionary";
import type { Project, ProjectId } from "@/content/schema";
import { cn } from "@/lib/utils";

export interface OpenState {
  id: ProjectId;
  /** Icon centre relative to the desktop — where the window grows from. */
  origin: string;
}

interface WorkstationProps {
  projects: Project[];
  work: Dictionary["work"];
  open: OpenState | null;
  view: number;
  /** Whether the next window to open takes focus — never on page load. */
  focusOnOpen: boolean;
  /** Whether the open project's live site leads its views on this device. */
  live: boolean;
  /**
   * The live site to frame now — only while it is the view on show and the
   * screen is near the viewport.
   */
  frame: LiveFrame | null;
  onLiveFail: (id: ProjectId) => void;
  hoverId: ProjectId | null;
  desktopRef: React.RefObject<HTMLDivElement | null>;
  onOpen: (id: ProjectId) => void;
  onClose: () => void;
  onHover: (id: ProjectId | null) => void;
  onStep: (delta: 1 | -1) => void;
  className?: string;
}

/**
 * The Spyke Studio workstation: a display with a small environment of its
 * own. Projects sit on the desktop as applications; opening one grows its
 * window out of the icon until it fills the screen with the real product.
 */
export function Workstation({
  projects,
  work,
  open,
  view,
  focusOnOpen,
  live,
  frame,
  onLiveFail,
  hoverId,
  desktopRef,
  onOpen,
  onClose,
  onHover,
  onStep,
  className,
}: WorkstationProps) {
  const active = open
    ? projects.find((project) => project.id === open.id)
    : undefined;

  return (
    <div
      role="group"
      aria-label={work.workstationLabel}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) onClose();
      }}
      className={className}
    >
      {/* Display --------------------------------------------------------- */}
      <div className="rounded-[0.875rem] border border-line-invert bg-[#12110f] p-1.5 pb-0 shadow-[0_80px_140px_-70px_rgb(0_0_0/0.95)] sm:rounded-[1rem] sm:p-2 sm:pb-0 lg:rounded-[1.125rem] lg:p-2.5 lg:pb-0">
        <div className="relative overflow-hidden rounded-[0.5rem] bg-void ring-1 ring-black/60 sm:rounded-[0.625rem]">
          {/* The opening: exactly one capture. */}
          <div aria-hidden="true" className={CAPTURE_ASPECT} />

          <div ref={desktopRef} className="absolute inset-0 overflow-hidden">
            {/* Wallpaper: the site's engineering grid and the mark. */}
            <div aria-hidden="true" className="absolute inset-0">
              <div className="blueprint absolute inset-0 opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgb(245_242_236/0.05),transparent_75%)]" />
              <div className="absolute right-[4%] bottom-[7%] h-[26%] opacity-[0.05]">
                <SpykeMark sizes="256px" />
              </div>
            </div>

            <ul
              inert={!!open}
              className={cn(
                // Wrapping flex so the row centres as one line while the icons share a top edge.
                "relative flex h-full flex-wrap content-center items-start justify-center gap-1 px-2 transition-opacity duration-300 sm:gap-6 lg:gap-10",
                open && "opacity-0",
              )}
            >
              {projects.map((project, index) => (
                <li key={project.id} data-reveal="up" data-rd={String(index + 1)}>
                  <DesktopIcon
                    project={project}
                    name={work.projects[project.id].name}
                    label={`${work.open}: ${work.projects[project.id].name}`}
                    lit={hoverId === project.id}
                    onOpen={() => onOpen(project.id)}
                    onHover={onHover}
                  />
                </li>
              ))}
            </ul>

            <AnimatePresence initial={false} mode="wait">
              {open && active && (
                <ProjectWindow
                  key={active.id}
                  project={active}
                  copy={work.projects[active.id]}
                  work={work}
                  screens={active.screens}
                  origin={open.origin}
                  live={live}
                  view={view}
                  focusOnOpen={focusOnOpen}
                  onStep={onStep}
                />
              )}
            </AnimatePresence>

            {/*
              Laid exactly over the window. The frame fades in once the
              window has grown and out before it shrinks.
            */}
            <LiveFrames
              current={frame}
              viewport={DESKTOP_VIEWPORT}
              titleOf={(id) => `${work.projects[id].name} — ${work.liveView}`}
              posterOf={(id) =>
                projects.find((project) => project.id === id)?.screens[0]
                  ?.desktop
              }
              posterSizes={MONITOR_SIZES}
              loadingLabel={work.liveLoading}
              shownClassName="delay-500"
              onFail={onLiveFail}
            />
          </div>
        </div>

        {/* Chin, with the studio's name on it */}
        <div
          aria-hidden="true"
          className="flex h-6 items-center justify-center sm:h-8 lg:h-10"
        >
          <span className="block h-2.5 opacity-55 sm:h-3 lg:h-3.5">
            <SpykeLogo tone="paper" sizes="48px" />
          </span>
        </div>
      </div>

      {/* Stand */}
      <div aria-hidden="true" className="hidden sm:block">
        <div className="mx-auto h-8 w-[13%] bg-gradient-to-b from-[#0d0c0a] via-[#1a1815] to-[#23201c] [clip-path:polygon(12%_0,88%_0,100%_100%,0_100%)] lg:h-11" />
        <div className="mx-auto h-2 w-[30%] rounded-t-md border border-b-0 border-line-invert bg-gradient-to-b from-[#26231f] to-[#1a1816] shadow-[0_18px_30px_-10px_rgb(0_0_0/0.8)] lg:h-2.5" />
      </div>
    </div>
  );
}

function DesktopIcon({
  project,
  name,
  label,
  lit,
  onOpen,
  onHover,
}: {
  project: Project;
  name: string;
  label: string;
  lit: boolean;
  onOpen: () => void;
  onHover: (id: ProjectId | null) => void;
}) {
  return (
    <button
      type="button"
      data-icon={project.id}
      onClick={onOpen}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(project.id)}
      onBlur={() => onHover(null)}
      aria-label={label}
      className="group/icon flex w-[4.75rem] flex-col items-center gap-2 rounded-lg p-1.5 text-center sm:w-28 sm:gap-3 sm:p-2"
    >
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-[0.75rem] border bg-gradient-to-b from-[#2b2723] to-[#191715] font-display text-sm font-semibold tracking-tight text-paper uppercase shadow-[0_14px_26px_-14px_rgb(0_0_0/0.95)] transition-[transform,border-color] duration-300 ease-[var(--ease-spatial)] group-hover/icon:-translate-y-0.5 group-hover/icon:border-paper/45 group-active/icon:scale-95 sm:h-16 sm:w-16 sm:rounded-[1rem] sm:text-xl lg:h-20 lg:w-20 lg:text-2xl",
          lit ? "-translate-y-0.5 border-paper/45" : "border-line-invert",
        )}
      >
        {project.glyph}
      </span>
      <span
        className={cn(
          "font-mono text-[9px] leading-tight tracking-wide transition-colors duration-200 group-hover/icon:text-paper sm:text-[11px]",
          lit ? "text-paper" : "text-paper/60",
        )}
      >
        {name}
      </span>
    </button>
  );
}
