import { Fragment } from "react";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import type { Dictionary } from "@/content/dictionary";
import { heroSculpture } from "@/content/site";

/**
 * Paper above, the dark surface below a red diagonal. The headline sits high,
 * the description and the action at the foot of the dark surface, and the
 * sculpture stands on the paper: beside the headline from lg, below it on
 * narrower screens. The entrance is CSS only (`globals.css` → entrance
 * choreography), so this stays a server component.
 */
export function Hero({ copy }: { copy: Dictionary["hero"] }) {
  return (
    <Section
      id="hero"
      labelledBy="hero-title"
      // Phones: a composed height rather than the whole (tall, narrow)
      // screen; About's charcoal continues the dark area below it. From sm
      // the whole screen, but never under 33rem: in a landscape phone the
      // diagonal (a proportion of this height) would reach the headline.
      className="isolate flex min-h-[clamp(40rem,100svh,44rem)] flex-col overflow-hidden bg-[#f7f6f3] text-[#191919] sm:min-h-[max(100svh,33rem)]"
    >
      {/*
        Dark lower section, with the red diagonal along its top edge. From sm
        up both are proportions of the hero. On phones they are measured from
        the bottom instead, so the dark area fits the text and action it
        carries and the slope stays gentle across a narrow screen; the edge's
        draw-in follows that slope (`--edge-rise`, globals.css). It lies over
        the sculpture, which rises from behind it, and under the text.
      */}
      <div
        aria-hidden="true"
        className="hero-surface pointer-events-none absolute inset-0 z-[1]"
      >
        <div className="absolute inset-0 bg-[#191919] [clip-path:polygon(0_calc(100%_-_17rem),100%_calc(100%_-_21.5rem),100%_100%,0_100%)] sm:[clip-path:polygon(0_80%,100%_63%,100%_100%,0_100%)]" />
        <div className="hero-edge absolute inset-0 bg-[#e50922] [--edge-rise:4.5rem] [clip-path:polygon(0_calc(100%_-_17rem_-_8px),100%_calc(100%_-_21.5rem_-_8px),100%_calc(100%_-_21.5rem),0_calc(100%_-_17rem))] sm:[--edge-rise:17%] sm:[clip-path:polygon(0_78.8%,100%_61.8%,100%_63%,0_80%)]" />
      </div>

      {/* Light logo area with subtle red glow */}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute top-0 right-0 h-[36%] w-[48%]"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(229,9,34,.12), transparent 70%)",
        }}
      />

      {/* Main content: higher headline, bottom-aligned actions */}
      {/* On phones the foot clears the bottom-left corner (and anything fixed there). */}
      {/* No stacking context of its own: the sculpture inside it goes under
          the dark surface while the text (z-10) stays above it. */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 pt-28 pb-[4.5rem] sm:px-10 sm:pt-36 sm:pb-14 lg:px-14 lg:pt-32">
        <div
          aria-hidden="true"
          className="hero-accent relative z-10 mt-1 mb-6 h-[3px] w-12 shrink-0 bg-[#e50922] sm:mt-[3vh] sm:mb-8"
        />

        <h1
          id="hero-title"
          // Phones: sized from the width, so the longest word («РАЗРАБОТЕНИ»,
          // ~7.2em) just fits the measure at 320–639px. From lg the four rows
          // are also capped by the height: the diagonal is placed by the
          // hero's height, so a wide, short window would otherwise run the
          // headline into it. Where there is room the cap is above 5.6vw.
          className="relative z-10 max-w-[1150px] text-[clamp(2.125rem,calc(13.2vw_-_6px),3.25rem)] leading-[0.98] font-black tracking-[-0.035em] uppercase sm:text-[clamp(2.25rem,5.6vw,6rem)] lg:text-[clamp(2.25rem,min(5.6vw,calc(15.8svh_-_2.5rem)),6rem)]"
        >
          {copy.statementLines.map((rows, index) => (
            <span key={rows.join(" ")} className="hero-mask">
              <span
                className="hero-line block"
                style={{ "--line": index } as React.CSSProperties}
              >
                {/* Four rows from lg, one under another; one line before. */}
                {rows.map((row, rowIndex) => (
                  <Fragment key={row}>
                    {rowIndex > 0 && " "}
                    <span className="lg:block">{row}</span>
                  </Fragment>
                ))}
                {/* Keeps the words apart when the text is copied or read aloud. */}
                {index < copy.statementLines.length - 1 && " "}
              </span>
            </span>
          ))}
        </h1>

        {/*
          The sculpture, rising from behind the dark surface: its base runs
          under the red edge. Phones: in the flow under the headline, its foot
          reaching below the diagonal's right end (the dark area's 21.5rem,
          less the foot's own height); the hero grows to fit. From sm it is
          laid out against the hero instead: from under the headline (lg:
          level with it, to its right) down past the diagonal, and the image
          stands on the bottom of that box, as large as the box allows. A box
          too short to show it well hides it (`.hero-visual`, globals.css).
          Its right margin is taken back, so the S lines up with the content
          edge.
        */}
        <div
          aria-hidden="true"
          className="hero-visual pointer-events-none relative z-0 mt-5 mb-[4rem] h-[clamp(9rem,calc(100svh_-_40rem),12rem)] shrink-0 min-[360px]:mb-[5rem] sm:absolute sm:inset-x-10 sm:top-[calc(13rem_+_3px_+_3vh_+_max(4.5rem,11vw))] sm:bottom-[27%] sm:m-0 sm:h-auto lg:top-[calc(8rem_+_3vh_+_9%)] lg:right-14 lg:bottom-[26%] lg:left-auto lg:w-[42%]"
        >
          <Image
            src={heroSculpture.src}
            alt=""
            width={heroSculpture.width}
            height={heroSculpture.height}
            sizes="(min-width: 1024px) min(36vw, 584px), (min-width: 640px) 46vw, 220px"
            quality={90}
            loading="eager"
            className="absolute right-0 bottom-0 h-[min(100cqh,calc(100cqw_*_1175_/_1338),32rem)] w-auto max-w-none translate-x-[14.6%]"
          />
        </div>

        {/* Copy on the left, the action on the right */}
        <div className="hero-lead relative z-10 mt-auto grid gap-6 border-t border-white/20 pt-6 sm:pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <p className="max-w-lg text-[0.9375rem] leading-relaxed text-white/75 sm:text-base lg:text-lg">
            {copy.lead}
          </p>

          <div className="hero-cta flex flex-wrap gap-3 md:justify-end">
            <a
              href="#work"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#e50922] px-6 text-sm font-bold text-white transition-colors hover:bg-[#bd061b] focus-visible:ring-2 focus-visible:ring-[#e50922] focus-visible:ring-offset-2 focus-visible:ring-offset-[#191919] focus-visible:outline-none sm:px-7"
            >
              {copy.primaryCta}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
