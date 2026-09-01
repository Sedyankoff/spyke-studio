import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { SpykeLogo } from "@/components/brand/spyke-logo";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/content/dictionary";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Hero({ copy }: { copy: Dictionary["hero"] }) {
  return (
    <Section
      id="hero"
      labelledBy="hero-title"
      className="isolate flex min-h-svh flex-col overflow-hidden"
    >
      <Container className="relative flex w-full flex-1 flex-col pt-24 pb-8 sm:pt-28 lg:pt-28 lg:pb-10">
        <div className="flex flex-1 flex-col justify-center">
          <p className="animate-rise flex items-center gap-3.5 [animation-delay:120ms]">
            <span aria-hidden="true" className="h-px w-9 bg-red sm:w-12" />
            <span className="meta text-ink-mute">{copy.eyebrow}</span>
          </p>

          <div className="mt-5 overflow-hidden pb-[3px] sm:mt-6">
            <div
              role="img"
              aria-label={siteConfig.name}
              className="animate-mask h-[clamp(2.5rem,5.6vw,4.25rem)] [animation-delay:220ms]"
            >
              <SpykeLogo eager sizes="(min-width: 1024px) 320px, 50vw" />
            </div>
          </div>

          <h1
            id="hero-title"
            className="animate-rise mt-7 max-w-[19ch] font-display text-[clamp(1.75rem,2.9vw,2.75rem)] leading-[1.06] font-semibold text-ink uppercase [animation-delay:400ms] sm:mt-8"
          >
            {copy.statement}
          </h1>

          <p className="animate-rise mt-5 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft [animation-delay:500ms] sm:max-w-md sm:text-base">
            {copy.lead}
          </p>

          <div className="animate-rise mt-8 flex flex-col gap-3 [animation-delay:600ms] sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="#work" size="lg">
              {copy.primaryCta}
              <ArrowDown
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:translate-y-1"
              />
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline" size="lg">
              {copy.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-6">
          <a
            href="#about"
            className="animate-rise group inline-flex items-center gap-3 [animation-delay:800ms]"
          >
            <span
              aria-hidden="true"
              className="relative flex h-7 w-px overflow-hidden bg-line"
            >
              <span className="absolute inset-x-0 top-0 h-1/2 bg-red transition-transform duration-500 ease-[var(--ease-spatial)] group-hover:translate-y-full" />
            </span>
            <span className="meta text-ink-mute transition-colors duration-200 group-hover:text-ink">
              {copy.scroll}
            </span>
          </a>

          {/* Below lg the metadata stays on paper, above the field. */}
          <HeroMeta
            copy={copy}
            className="animate-rise flex flex-col items-end gap-1 text-right text-ink-mute [animation-delay:800ms] lg:text-paper/55"
          />
        </div>
      </Container>

      {/*
        The dark field. Its mask dissolves the whole layer — plate, photograph
        and scrims — into the paper background, so the image reads as emerging
        from shadow instead of starting at a hard edge.

        Below lg it is a band in normal flow beneath the content, so nothing
        ever sits on top of the photograph. From lg it lifts out of flow and
        becomes the right half of the composition, and the transition axis
        turns with it.
      */}
      <div
        aria-hidden="true"
        className="relative h-[38svh] w-full shrink-0 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[42%] lg:-z-10 lg:h-auto lg:w-auto"
      >
        <div className="hero-field animate-field absolute inset-0 bg-void [animation-delay:120ms]">
          <div className="hero-photo absolute inset-0 overflow-hidden">
            <Image
              src={siteConfig.heroImage.src}
              alt=""
              width={siteConfig.heroImage.width}
              height={siteConfig.heroImage.height}
              sizes="(min-width: 1024px) 62vw, 100vw"
              fetchPriority="high"
              loading="eager"
              className="animate-settle h-full w-full object-cover object-[58%_46%] brightness-[0.74] contrast-[1.12] saturate-[0.45] [animation-delay:120ms]"
            />
          </div>

          {/*
            Two scrims, both deliberately shallow — the field mask already
            carries the transition, so these only deepen its leading edge.
          */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(11_10_9/0.8)_0%,rgb(11_10_9/0.2)_28%,transparent_60%)] lg:bg-[linear-gradient(to_right,rgb(11_10_9/0.95)_0%,rgb(11_10_9/0.28)_20%,transparent_46%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(11_10_9/0.35)_0%,transparent_60%)] lg:bg-[linear-gradient(to_top,rgb(11_10_9/0.85)_0%,rgb(11_10_9/0.35)_22%,transparent_52%,rgb(11_10_9/0.3)_100%)]" />
          <div className="grain absolute inset-0 opacity-[0.05]" />
        </div>

        {/* The red seam: one hairline holding the two halves together. */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px lg:inset-y-0 lg:right-auto lg:left-0 lg:h-auto lg:w-px">
          <span className="animate-grow block h-full w-full bg-gradient-to-r from-transparent via-red to-transparent [animation-delay:900ms] lg:animate-drop lg:bg-gradient-to-b lg:from-transparent lg:via-red lg:to-transparent" />
        </span>
      </div>
    </Section>
  );
}

function HeroMeta({
  copy,
  className,
}: {
  copy: Dictionary["hero"];
  className?: string;
}) {
  const rows = [
    { value: copy.role, compact: false },
    { value: siteConfig.coordinates, compact: true },
    { value: `EST. ${siteConfig.founded}`, compact: true },
  ];

  return (
    <dl className={cn("meta", className)}>
      {rows.map((row) => (
        <div key={row.value} className={cn(!row.compact && "hidden sm:block")}>
          <dt className="sr-only">{copy.eyebrow}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
