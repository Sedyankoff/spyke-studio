"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
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
  // The details keep showing the last project if its window is closed.
  const [selectedId, setSelectedId] = useState<ProjectId>(initialOpen.id);
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

  /** The frame never loaded: drop the live view for that project, quietly. */
  function liveFailed(id: ProjectId) {
    setFailed((list) => (list.includes(id) ? list : [...list, id]));
    // Without the live view in front, the same screenshot is one step earlier.
    if (active?.id === id) setView((current) => Math.max(current - 1, 0));
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

    setSelectedId(id);
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

  const selected = projects.find((project) => project.id === selectedId) ?? null;
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
          onOpen={openProject}
          onHover={setHoverId}
          className="mt-12 sm:mt-16"
        />

        <div className="mt-8 grid grid-cols-1 gap-y-10 sm:mt-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)] lg:items-center lg:gap-x-16">
          <div>
            {/*
              The monitor and the phone share one cell: the phone stands at
              the right, overlapping the monitor's lower corner.
            */}
            <div
              ref={stationRef}
              data-reveal="scale"
              className="isolate grid scroll-mt-24"
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
                className="isolate col-start-1 row-start-1 w-[78%] self-start sm:w-[82%]"
              />
              <div className="relative z-10 col-start-1 row-start-1 w-[30%] self-end justify-self-end sm:w-[22%]">
                <Phone
                  image={screen?.mobile ?? null}
                  alt={
                    screen && active
                      ? `${copy.projects[active.id].screens[screen.id]?.alt ?? copy.projects[active.id].name} — ${copy.mobileView}`
                      : ""
                  }
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
                  <span className="truncate">{screenLabel}</span>
                  <span className="text-paper/35 tabular-nums">
                    {view + 1} / {viewCount(active)}
                  </span>
                </p>
              )}
            </div>
          </div>

          <ProjectDetails project={selected} work={copy} />
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
