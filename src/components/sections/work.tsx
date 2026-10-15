"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import * as deviceMotion from "@/components/work/device-motion";
import { SectionIntro } from "@/components/ui/section-intro";
import type { LiveFrame } from "@/components/work/live-frames";
import { Phone } from "@/components/work/phone";
import { ProjectDetails, ProjectIndex } from "@/components/work/project-info";
import { Workstation, type OpenState } from "@/components/work/workstation";
import { projects } from "@/content/projects";
import type { Dictionary } from "@/content/dictionary";
import type { Project, ProjectId } from "@/content/schema";

interface WorkProps {
  copy: Dictionary["work"];
  /** Projects whose live site passed the framing check at build time. */
  embeddable: ProjectId[];
}

/**
 * Live previews are a desktop enhancement: a fine pointer and a window wide
 * enough to use a site in. Touch devices and small screens keep the
 * screenshots and the link out to the real product — on a phone, the reader
 * already holds the real mobile site one tap away.
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
 * The project index, then one composition: the workstation with the phone
 * overlapping its corner on the left (about 60%), and what to read on the
 * right. Below lg the two stack: devices, screen controls, then the details.
 */
export function Work({ copy, embeddable }: WorkProps) {
  const [open, setOpen] = useState<OpenState | null>(initialOpen);
  const [view, setView] = useState(0);
  const [hoverId, setHoverId] = useState<ProjectId | null>(null);
  const [focusWindow, setFocusWindow] = useState(false);
  const [failed, setFailed] = useState<ProjectId[]>([]);
  // The phone's frame can fail on its own; the monitor keeps its live view.
  const [mobileFailed, setMobileFailed] = useState<ProjectId[]>([]);
  // The details keep showing the last project if its window is closed.
  const [selectedId, setSelectedId] = useState<ProjectId>(initialOpen.id);
  const liveCapable = useSyncExternalStore(
    subscribeLive,
    () => window.matchMedia(LIVE_QUERY).matches,
    () => false,
  );
  const desktopRef = useRef<HTMLDivElement>(null);
  const stationRef = useRef<HTMLDivElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  // Which way the last change of project went, for the details to follow.
  const [direction, setDirection] = useState<1 | -1>(1);

  /*
   * The devices' first arrival. Like the page's scroll reveals, nothing is
   * hidden by the markup: only a scene still below the fold is moved
   * offstage, here, and it comes in as it reaches the viewport. A scene
   * already on screen, or a reader who prefers less motion, gets it as is.
   */
  useEffect(() => {
    const station = stationRef.current;
    const monitor = monitorRef.current;
    const phone = phoneRef.current;
    if (!station || !monitor || !phone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (station.getBoundingClientRect().top < window.innerHeight) return;

    deviceMotion.placeOffstage(monitor, phone);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        deviceMotion.enter(monitor, phone);
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    observer.observe(station);
    return () => {
      observer.disconnect();
      deviceMotion.settle(monitor, phone);
    };
  }, []);

  // Live sites are only loaded once the devices are near the viewport.
  const [nearView, setNearView] = useState(false);
  useEffect(() => {
    const station = stationRef.current;
    if (!station || nearView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearView(true);
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(station);
    return () => observer.disconnect();
  }, [nearView]);

  const active = open
    ? projects.find((project) => project.id === open.id)
    : null;

  function liveOf(project: Project) {
    return project.embedUrl &&
      liveCapable &&
      embeddable.includes(project.id) &&
      !failed.includes(project.id)
      ? project.embedUrl
      : null;
  }
  const live = active ? liveOf(active) : null;

  // Both devices show the same site while the live view is up: the monitor at
  // a desktop width, the phone at a phone's.
  const liveShown = !!active && !!live && nearView && view === 0;
  const desktopFrame: LiveFrame | null =
    liveShown && active && live ? { id: active.id, url: live } : null;
  const mobileFrame: LiveFrame | null =
    desktopFrame && !mobileFailed.includes(desktopFrame.id)
      ? desktopFrame
      : null;

  function mobileFailedFor(id: ProjectId) {
    setMobileFailed((list) => (list.includes(id) ? list : [...list, id]));
  }

  /** The live site, when there is one, then the screens. */
  function viewCount(project: Project) {
    return project.screens.length + (liveOf(project) ? 1 : 0);
  }

  /** The frame never loaded: drop the live view for that project, quietly. */
  function liveFailed(id: ProjectId) {
    setFailed((list) => (list.includes(id) ? list : [...list, id]));
    // Without the live view in front, the same screenshot is one step earlier.
    if (active?.id === id) setView((current) => Math.max(current - 1, 0));
  }

  // The phone shows the mobile capture of the screen on the monitor; while
  // the live site is up, that of the first screen.
  const screen = active
    ? (active.screens[Math.max(view - (live ? 1 : 0), 0)] ?? active.screens[0])
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

  function openProject(
    id: ProjectId,
    startView = 0,
    focus = true,
    travel?: 1 | -1,
  ) {
    if (open?.id === id) return;

    // From the index the direction follows the order of the projects; the
    // arrows pass theirs, so wrapping round still reads as "onwards".
    const from = projects.findIndex((project) => project.id === selectedId);
    const to = projects.findIndex((project) => project.id === id);
    const way = travel ?? (to > from ? 1 : -1);
    setDirection(way);
    setSelectedId(id);

    const monitor = monitorRef.current;
    const phone = phoneRef.current;
    if (
      monitor &&
      phone &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      deviceMotion.change(monitor, phone, way);
    }

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
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
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
      delta,
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

  const selected =
    projects.find((project) => project.id === selectedId) ?? null;
  const screenLabel = active
    ? live && view === 0
      ? copy.liveView
      : screen && copy.projects[active.id].screens[screen.id]?.label
    : null;

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

      {/* Wider than the other sections, so the devices and the details both get room. */}
      <Container className="relative max-w-[96rem]">
        <SectionIntro
          titleId="work-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
          tone="paper"
        />

        <ProjectIndex
          projects={projects}
          work={copy}
          activeId={open?.id ?? null}
          hoverId={hoverId}
          onOpen={(id) => openProject(id)}
          onHover={setHoverId}
          className="mt-12 sm:mt-16"
        />

        <div className="mt-8 grid grid-cols-1 gap-y-10 sm:mt-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-x-16">
          <div>
            {/*
              The monitor and the phone share one cell: the phone stands at
              the right, overlapping the monitor's lower corner.
            */}
            <div
              ref={stationRef}
              className="isolate grid scroll-mt-24 [perspective:1600px]"
            >
              <div
                ref={monitorRef}
                className="isolate col-start-1 row-start-1 w-[80%] origin-[50%_85%] self-start sm:w-[84%]"
              >
                <Workstation
                  projects={projects}
                  work={copy}
                  open={open}
                  view={view}
                  focusOnOpen={focusWindow}
                  live={!!live}
                  frame={desktopFrame}
                  onLiveFail={liveFailed}
                  hoverId={hoverId}
                  desktopRef={desktopRef}
                  onOpen={(id) => openProject(id)}
                  onClose={closeProject}
                  onHover={setHoverId}
                  onStep={step}
                />
              </div>
              <div
                ref={phoneRef}
                className="relative z-10 col-start-1 row-start-1 w-[30%] origin-[50%_100%] self-end justify-self-end sm:w-[23%]"
              >
                <Phone
                  image={screen?.mobile ?? null}
                  alt={
                    screen && active
                      ? `${copy.projects[active.id].screens[screen.id]?.alt ?? copy.projects[active.id].name} — ${copy.mobileView}`
                      : ""
                  }
                  frame={mobileFrame}
                  frameTitleOf={(id) =>
                    `${copy.projects[id].name} — ${copy.liveView}, ${copy.mobileView}`
                  }
                  posterOf={(id) =>
                    projects.find((project) => project.id === id)?.screens[0]
                      ?.mobile
                  }
                  onLiveFail={mobileFailedFor}
                />
              </div>
            </div>

            {/* Previous / next, with where the reader is. */}
            <div
              data-reveal="fade"
              data-rd="2"
              className="mt-5 flex items-center gap-2 sm:mt-6"
            >
              <StepButton label={copy.previousImage} onClick={() => step(-1)}>
                <ArrowLeft
                  strokeWidth={1.5}
                  className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:-translate-x-0.5"
                />
              </StepButton>
              <StepButton label={copy.nextImage} onClick={() => step(1)}>
                <ArrowRight
                  strokeWidth={1.5}
                  className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:translate-x-0.5"
                />
              </StepButton>
              {active && (
                <p
                  aria-hidden="true"
                  className="meta ml-2 flex min-w-0 items-center gap-3 text-paper/55"
                >
                  <span className="text-paper/35 tabular-nums">
                    {view + 1} / {viewCount(active)}
                  </span>
                </p>
              )}
            </div>
          </div>

          <ProjectDetails
            project={selected}
            direction={direction}
            work={copy}
          />
        </div>
      </Container>
    </Section>
  );
}

function StepButton({
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
      className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-invert text-paper/70 transition-colors duration-200 hover:border-paper hover:bg-paper hover:text-ink active:scale-95"
    >
      {children}
    </button>
  );
}
