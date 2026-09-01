"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { GraduationCap, MapPin, Radio } from "lucide-react";
import { SpykeMark } from "@/components/brand/spyke-logo";
import { SocialLinks } from "@/components/ui/social-links";
import { TechIcon } from "@/components/ui/tech-icon";
import { brandIcons } from "@/components/ui/brand-icons";
import type { NavPreviewData } from "@/content/nav-preview";
import type { Dictionary } from "@/content/dictionary";
import type { NavSectionId } from "@/content/schema";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const canvas = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.045, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.22 } },
};

const item = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

interface NavPreviewProps {
  section: NavSectionId;
  index: number;
  nav: Dictionary["nav"];
  data: NavPreviewData;
}

/**
 * The preview layer of the navigation overlay. Every section gets its own
 * composition — they share a language (mono header, red rule, staggered
 * entrance) but none of them is the same card twice.
 */
export function NavPreview({ section, index, nav, data }: NavPreviewProps) {
  const item_ = nav.items[section];

  return (
    <div className="relative hidden overflow-hidden lg:block">
      <div aria-hidden="true" className="blueprint absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-ink to-transparent"
      />

      <p className="meta absolute top-7 left-12 z-10 text-paper/25 xl:left-16">
        {nav.previewLabel}
      </p>

      <AnimatePresence initial={false}>
        <m.div
          key={section}
          variants={canvas}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 flex flex-col justify-center px-12 py-16 xl:px-16"
        >
          <m.div variants={item} className="flex items-center gap-4">
            <span className="meta text-red-light">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              aria-hidden="true"
              className="h-px w-12 origin-left bg-red-light/60"
            />
            <span className="meta text-paper/40">{item_.hint}</span>
          </m.div>

          <div className="mt-9">
            <PreviewBody section={section} data={data} />
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}

function PreviewBody({
  section,
  data,
}: {
  section: NavSectionId;
  data: NavPreviewData;
}) {
  switch (section) {
    case "about":
      return <AboutPreview data={data.about} />;
    case "stack":
      return <StackPreview data={data.stack} />;
    case "work":
      return <WorkPreview data={data.work} />;
    case "experience":
      return <ExperiencePreview data={data.experience} />;
    case "education":
      return <EducationPreview data={data.education} />;
    case "contact":
      return <ContactPreview data={data.contact} />;
  }
}

/* -------------------------------------------------------------- 01 · about */

function AboutPreview({ data }: { data: NavPreviewData["about"] }) {
  const [first, ...rest] = data.name.split(" ");

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 h-48 opacity-[0.08]"
      >
        <SpykeMark sizes="160px" />
      </div>

      <m.h3
        variants={item}
        className="display-section max-w-[12ch] text-paper"
      >
        {first}
        <br />
        <span className="text-paper/45">{rest.join(" ")}</span>
      </m.h3>

      <m.p
        variants={item}
        className="mt-5 flex items-center gap-3 text-sm text-paper/60"
      >
        {data.role}
        <span aria-hidden="true" className="h-3 w-px bg-line-invert" />
        {data.studio}
      </m.p>

      <m.dl
        variants={item}
        className="mt-10 grid max-w-lg grid-cols-2 gap-px bg-line-invert-soft"
      >
        {data.facts.map((fact) => (
          <div key={fact.label} className="bg-ink px-4 py-3.5">
            <dt className="meta text-paper/35">{fact.label}</dt>
            <dd className="mt-1.5 text-[13px] text-paper/85">{fact.value}</dd>
          </div>
        ))}
      </m.dl>
    </div>
  );
}

/* -------------------------------------------------------------- 02 · stack */

/** Deterministic scatter so the constellation never lands on a plain grid. */
const scatter = [0, 22, 8, 30, 14, 0, 26, 10, 34, 4, 18, 28, 6, 24, 12, 32];

function StackPreview({ data }: { data: NavPreviewData["stack"] }) {
  return (
    <m.ul variants={item} className="flex max-w-xl flex-wrap gap-3">
      {data.technologies.map((technology, i) => (
        <m.li
          key={technology.id}
          variants={{
            initial: { opacity: 0, y: 14, scale: 0.94 },
            animate: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.5, delay: i * 0.028, ease: EASE },
            },
            exit: { opacity: 0, transition: { duration: 0.16 } },
          }}
          style={{ marginTop: `${scatter[i % scatter.length]}px` }}
          className="group/tech flex items-center gap-2.5 rounded-full border border-line-invert bg-paper/[0.03] px-3.5 py-2.5"
        >
          <span
            style={
              { "--brand": brandIcons[technology.icon].hex } as React.CSSProperties
            }
            className="text-paper/70 transition-colors duration-300 group-hover/tech:text-[var(--brand)]"
          >
            <TechIcon id={technology.icon} className="h-5 w-5" />
          </span>
          <span className="font-mono text-[11px] tracking-wide text-paper/70">
            {technology.name}
          </span>
        </m.li>
      ))}
    </m.ul>
  );
}

/* --------------------------------------------------------------- 03 · work */

function WorkPreview({ data }: { data: NavPreviewData["work"] }) {
  const cards = data.items.filter((entry) => entry.image).slice(0, 3);

  return (
    <div>
      <div className="relative h-[15rem] max-w-xl xl:h-[17rem]">
        {cards.map((entry, i) => (
          <m.div
            key={entry.id}
            variants={{
              initial: { opacity: 0, y: 26, rotate: 0 },
              animate: {
                opacity: 1,
                y: i * -14,
                rotate: (i - 1) * 2.2,
                transition: { duration: 0.6, delay: i * 0.07, ease: EASE },
              },
              exit: { opacity: 0, transition: { duration: 0.18 } },
            }}
            style={{ zIndex: cards.length - i, left: `${i * 7}%` }}
            className="absolute top-0 w-[78%] overflow-hidden rounded-lg border border-line-invert bg-[#141210] shadow-[0_30px_70px_-30px_rgb(0_0_0/0.9)]"
          >
            <span className="flex h-6 items-center gap-1.5 border-b border-line-invert-soft px-3">
              <span className="h-1.5 w-1.5 rounded-full bg-paper/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-paper/15" />
            </span>
            {entry.image && (
              <Image
                src={entry.image.src}
                alt=""
                width={entry.image.width}
                height={entry.image.height}
                sizes="420px"
                className="block w-full"
              />
            )}
          </m.div>
        ))}
      </div>

      <m.ul variants={item} className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {data.items.map((entry) => (
          <li key={entry.id} className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-red" />
            <span className="font-mono text-[11px] tracking-wide text-paper/50">
              {entry.name}
            </span>
          </li>
        ))}
      </m.ul>
    </div>
  );
}

/* --------------------------------------------------------- 04 · experience */

function ExperiencePreview({ data }: { data: NavPreviewData["experience"] }) {
  return (
    <div className="relative max-w-lg pl-8">
      <m.span
        aria-hidden="true"
        variants={{
          initial: { scaleY: 0 },
          animate: {
            scaleY: 1,
            transition: { duration: 0.7, ease: EASE },
          },
          exit: { opacity: 0, transition: { duration: 0.18 } },
        }}
        className="absolute top-2 bottom-2 left-[3px] w-px origin-top bg-gradient-to-b from-red via-red/40 to-transparent"
      />

      <ol className="space-y-8">
        {data.items.map((entry, i) => (
          <m.li key={entry.id} variants={item} className="relative">
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1.5 -left-8 h-[7px] w-[7px] rounded-full",
                i === 0 ? "bg-red" : "border border-paper/30 bg-ink",
              )}
            />
            {i === 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-8 h-[7px] w-[7px] animate-ping rounded-full bg-red/60"
              />
            )}
            <p className="meta text-paper/40">{entry.period}</p>
            <p className="mt-2 font-display text-xl font-semibold uppercase text-paper">
              {entry.role}
            </p>
            <p className="mt-1 text-[13px] text-paper/45">{entry.company}</p>
          </m.li>
        ))}
      </ol>
    </div>
  );
}

/* ---------------------------------------------------------- 05 · education */

function EducationPreview({ data }: { data: NavPreviewData["education"] }) {
  return (
    <m.div
      variants={item}
      className="max-w-lg rounded-card border border-line-invert bg-paper/[0.03] p-7"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="meta text-paper/40">{data.period}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold uppercase text-paper">
            {data.degree}
          </h3>
          <p className="mt-1.5 text-[13px] text-paper/50">{data.institution}</p>
        </div>
        <GraduationCap
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-red-light"
        />
      </div>

      <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line-invert-soft pt-5">
        {data.focus.map((area) => (
          <li
            key={area}
            className="rounded-md border border-line-invert px-2 py-1 font-mono text-[10px] tracking-wide text-paper/55"
          >
            {area}
          </li>
        ))}
      </ul>

      <dl className="mt-6 space-y-2 border-t border-line-invert-soft pt-5">
        {data.languages.map((language) => (
          <div
            key={language.name}
            className="flex items-baseline justify-between gap-4"
          >
            <dt className="text-[13px] text-paper/75">{language.name}</dt>
            <dd className="font-mono text-[10px] tracking-wide text-paper/35">
              {language.level ?? "—"}
            </dd>
          </div>
        ))}
      </dl>
    </m.div>
  );
}

/* ------------------------------------------------------------ 06 · contact */

function ContactPreview({ data }: { data: NavPreviewData["contact"] }) {
  return (
    <div className="max-w-xl">
      <m.p
        variants={item}
        className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-semibold text-paper"
      >
        {data.email}
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-pulse bg-red"
        />
      </m.p>

      <m.p variants={item} className="mt-6 max-w-md text-sm text-paper/55">
        {data.lead}
      </m.p>

      <m.p
        variants={item}
        className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-line-invert px-4 py-2 text-xs text-paper/70"
      >
        <Radio aria-hidden="true" className="h-3.5 w-3.5 text-red-light" />
        {data.availability}
      </m.p>

      <m.div variants={item} className="mt-8 flex items-center gap-5">
        <SocialLinks tone="paper" />
        <span className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-paper/35">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
          Bulgaria
        </span>
      </m.div>
    </div>
  );
}
