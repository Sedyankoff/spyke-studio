"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { Phone } from "@/components/work/phone";
import { ProjectInfo } from "@/components/work/project-info";
import { Workstation, type OpenState } from "@/components/work/workstation";
import { projects } from "@/content/projects";
import type { Dictionary } from "@/content/dictionary";
import type { ProjectId } from "@/content/schema";
import { cn } from "@/lib/utils";

interface WorkProps {
  copy: Dictionary["work"];
  present: string;
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

/**
 * Visual first: the workstation takes the width of the section, the phone
 * stands beside it showing the same project's mobile view, and everything
 * to read sits underneath. On phones: monitor, phone, then information.
 */
/** The monitor never starts empty: the first project is open on arrival. */
const initialOpen: OpenState = { id: projects[0].id, origin: "50% 50%" };

export function Work({ copy, present, embeddable }: WorkProps) {
  const [open, setOpen] = useState<OpenState | null>(initialOpen);
  const [view, setView] = useState(0);
  const [hoverId, setHoverId] = useState<ProjectId | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [failed, setFailed] = useState<ProjectId[]>([]);
  const liveCapable = useSyncExternalStore(
    subscribeLive,
    () => window.matchMedia(LIVE_QUERY).matches,
    () => false,
  );
  const desktopRef = useRef<HTMLDivElement>(null);
  const stationRef = useRef<HTMLDivElement>(null);

  const active = open ? projects.find((project) => project.id === open.id) : null;
  const live =
    active?.embedUrl &&
    liveCapable &&
    embeddable.includes(active.id) &&
    !failed.includes(active.id)
      ? active.embedUrl
      : null;

  /** The frame never loaded: drop the live view for this project, quietly. */
  function liveFailed() {
    if (!active) return;
    const id = active.id;
    setFailed((list) => (list.includes(id) ? list : [...list, id]));
    setView(0);
  }
  const mobileView = active?.images.find((image) => image.kind === "mobile") ?? null;

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

  function openProject(id: ProjectId) {
    if (open?.id === id) return;

    retire(() => {
      setInteracted(true);
      setOpen({ id, origin: originOf(id) });
      setView(0);
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
            className="isolate scroll-mt-24 sm:col-start-1 sm:row-start-1"
          >
            <Workstation
              projects={projects}
              work={copy}
              open={open}
              view={view}
              interacted={interacted}
              live={live}
              onLiveFail={liveFailed}
              hoverId={hoverId}
              desktopRef={desktopRef}
              onOpen={openProject}
              onClose={closeProject}
              onHover={setHoverId}
              onView={setView}
            />
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
              !mobileView && "max-sm:hidden",
            )}
          >
            <Phone
              image={mobileView}
              alt={
                mobileView && active
                  ? (copy.projects[active.id].images[mobileView.id]?.alt ?? "")
                  : ""
              }
            />
          </div>

          <ProjectInfo
            projects={projects}
            work={copy}
            present={present}
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
