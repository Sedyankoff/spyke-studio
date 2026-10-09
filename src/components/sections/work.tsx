"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { Phone } from "@/components/work/phone";
import { ProjectInfo } from "@/components/work/project-info";
import { Workstation, type OpenState } from "@/components/work/workstation";
import { projects } from "@/content/projects";
import type { Dictionary } from "@/content/dictionary";
import type { Project, ProjectId } from "@/content/schema";
import { cn } from "@/lib/utils";

interface WorkProps {
  copy: Dictionary["work"];
  /** Projects whose live site passed the framing check at build time. */
  embeddable: ProjectId[];
}

/**
 * Live previews are a desktop enhancement: a fine pointer and a window wide
 * enough to use a site in. Touch devices and small screens keep the
 * screenshots and the link out to the real product.
 */
const LIVE_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 768px)";

function subscribeLive(onChange: () => void) {
  const query = window.matchMedia(LIVE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** The monitor never starts empty: the first project is open on arrival. */
const initialOpen: OpenState = { id: projects[0].id, origin: "50% 50%" };

/**
 * Visual first: the workstation takes the width of the section, the phone
 * stands beside it showing the same screen at mobile width, and everything
 * to read sits underneath. On phones: monitor, phone, then information.
 */
export function Work({ copy, embeddable }: WorkProps) {
  const [open, setOpen] = useState<OpenState | null>(initialOpen);
  const [view, setView] = useState(0);
  const [hoverId, setHoverId] = useState<ProjectId | null>(null);
  const [focusWindow, setFocusWindow] = useState(false);
  const [failed, setFailed] = useState<ProjectId[]>([]);
  const liveCapable = useSyncExternalStore(
    subscribeLive,
    () => window.matchMedia(LIVE_QUERY).matches,
    () => false,
  );
  const desktopRef = useRef<HTMLDivElement>(null);
  const stationRef = useRef<HTMLDivElement>(null);

  const active = open ? projects.find((project) => project.id === open.id) : null;

  function liveOf(project: Project) {
    return project.embedUrl &&
      liveCapable &&
      embeddable.includes(project.id) &&
      !failed.includes(project.id)
      ? project.embedUrl
      : null;
  }
  const live = active ? liveOf(active) : null;

  /** The live site, when there is one, then the screens. */
  function viewCount(project: Project) {
    return project.screens.length + (liveOf(project) ? 1 : 0);
  }

  /** The frame never loaded: drop the live view for this project, quietly. */
  function liveFailed() {
    if (!active) return;
    const id = active.id;
    setFailed((list) => (list.includes(id) ? list : [...list, id]));
    setView(0);
  }

  // The phone shows the mobile capture of the screen on the monitor; while
  // the live site is up, that of the first screen.
  const screen = active
    ? active.screens[Math.max(view - (live ? 1 : 0), 0)] ?? active.screens[0]
    : null;

  /** Where a project's icon sits on the desktop — its window grows from there. */
  function originOf(id: ProjectId) {
    const desktop = desktopRef.current;
    const icon = desktop?.querySelector<HTMLElement>(`[data-icon="${id}"]`);
    if (!desktop || !icon) return "50% 50%";

    const d = desktop.getBoundingClientRect();
    const i = icon.getBoundingClientRect();
    return `${i.left + i.width / 2 - d.left}px ${i.top + i.height / 2 - d.top}px`;
  }

  /**
   * Re-aim the open window at its own icon before it leaves, so it always
   * shrinks back to where it belongs, then apply the change a frame later.
   */
  function retire(next: () => void) {
    if (!open) {
      next();
      return;
    }
    setOpen({ ...open, origin: originOf(open.id) });
    requestAnimationFrame(next);
  }

  function openProject(id: ProjectId, startView = 0, focus = true) {
    if (open?.id === id) return;

    retire(() => {
      setFocusWindow(focus);
      setOpen({ id, origin: originOf(id) });
      setView(startView);
    });

    // Opened from the index below: make sure the screen is there to watch.
    const screen = desktopRef.current;
    if (screen) {
      const rect = screen.getBoundingClientRect();
      const visible =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (visible < rect.height * 0.6) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        stationRef.current?.scrollIntoView({
          block: "start",
          behavior: reduce ? "auto" : "smooth",
        });
      }
    }
  }

  /**
   * Previous / next: through the open project's screens first, then on to the
   * neighbouring project — entered from its last screen when going back.
   */
  function step(delta: 1 | -1) {
    if (active) {
      const next = view + delta;
      if (next >= 0 && next < viewCount(active)) {
        setView(next);
        return;
      }
    }

    const index = active ? projects.indexOf(active) : delta > 0 ? -1 : 0;
    const target =
      projects[(index + delta + projects.length) % projects.length];
    // Keep focus in the screen when stepping from the keyboard inside it.
    const focus = !!desktopRef.current?.contains(document.activeElement);
    openProject(
      target.id,
      delta > 0 ? 0 : Math.max(viewCount(target) - 1, 0),
      focus,
    );
  }

  function closeProject() {
    if (!open) return;
    const { id } = open;
    const hadFocus = stationRef.current?.contains(document.activeElement);
    retire(() => setOpen(null));

    if (hadFocus) {
      setTimeout(() =>
        desktopRef.current
          ?.querySelector<HTMLElement>(`[data-icon="${id}"]`)
          ?.focus({ preventScroll: true }),
      );
    }
  }

  return (
    <Section
      id="work"
      labelledBy="work-title"
      tone="dark"
      className="section-y overflow-hidden bg-ink text-paper"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grain absolute inset-0 opacity-[0.04]" />
      </div>

      <Container className="relative">
        <SectionIntro
          titleId="work-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
          tone="paper"
        />

        <div className="mt-12 grid grid-cols-1 gap-y-12 sm:mt-16 sm:grid-cols-[minmax(0,86fr)_minmax(0,14fr)] sm:gap-y-14">
          <div
            ref={stationRef}
            data-reveal="scale"
            className="isolate col-start-1 row-start-1 scroll-mt-24"
          >
            <Workstation
              projects={projects}
              work={copy}
              open={open}
              view={view}
              focusOnOpen={focusWindow}
              live={live}
              onLiveFail={liveFailed}
              hoverId={hoverId}
              desktopRef={desktopRef}
              onOpen={openProject}
              onClose={closeProject}
              onHover={setHoverId}
              onStep={step}
            />
          </div>

          {/*
            Previous / next. On wide screens they stand in the gutters, either
            side of the monitor and phone; below that there is no gutter to
            spare, so they sit just inside the screen's edges. Either way they
            are centred on the screen: its centre is derived from the width of
            this layer (the monitor takes 86% of it from sm up, then its bezel
            and 16:9).
          */}
          <div
            data-reveal="fade"
            data-rd="2"
            className="@container pointer-events-none relative z-20 col-start-1 row-start-1 sm:col-end-3"
          >
            <StepButton
              label={copy.previousImage}
              onClick={() => step(-1)}
              className="left-3.5 sm:left-[calc(3cqw+0.75rem)] lg:right-[calc(100%+0.375rem)] lg:left-auto min-[87.5rem]:right-[calc(100%+1.25rem)]"
            >
              <ArrowLeft
                strokeWidth={1.5}
                className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:-translate-x-0.5"
              />
            </StepButton>
            <StepButton
              label={copy.nextImage}
              onClick={() => step(1)}
              className="right-3.5 sm:right-[calc(17cqw+0.75rem)] lg:right-auto lg:left-[calc(100%+0.375rem)] min-[87.5rem]:left-[calc(100%+1.25rem)]"
            >
              <ArrowRight
                strokeWidth={1.5}
                className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:translate-x-0.5"
              />
            </StepButton>
          </div>

          {/*
            The phone overlaps the monitor's lower corner from sm upwards; on
            phones it sits below the monitor, and only when there is a mobile
            view to show.
          */}
          <div
            data-reveal="up"
            data-rd="2"
            className={cn(
              "mx-auto w-[46%] max-w-[13rem] sm:relative sm:z-10 sm:order-none sm:col-start-2 sm:row-start-1 sm:mx-0 sm:-ml-[21%] sm:w-[111%] sm:max-w-none sm:self-end",
              !screen && "max-sm:hidden",
            )}
          >
            <Phone
              image={screen?.mobile ?? null}
              alt={
                screen && active
                  ? `${copy.projects[active.id].screens[screen.id]?.alt ?? copy.projects[active.id].name} — ${copy.mobileView}`
                  : ""
              }
            />
          </div>

          <ProjectInfo
            projects={projects}
            work={copy}
            activeId={open?.id ?? null}
            hoverId={hoverId}
            onOpen={openProject}
            onHover={setHoverId}
            className="sm:col-span-2 sm:row-start-2"
          />
        </div>
      </Container>
    </Section>
  );
}

function StepButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group pointer-events-auto absolute top-[calc(28.125cqw+3px)] flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-line-invert bg-void/55 text-paper/80 transition-colors duration-200 hover:border-paper hover:bg-paper hover:text-ink sm:top-[calc(24.19cqw+5px)] sm:h-9 sm:w-9 lg:bg-transparent lg:text-paper/70 min-[87.5rem]:h-11 min-[87.5rem]:w-11",
        className,
      )}
    >
      {children}
    </button>
  );
}
