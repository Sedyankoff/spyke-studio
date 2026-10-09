import Image from "next/image";
import { Crosshair, GraduationCap, Layers, MapPin } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/content/dictionary";
import { portrait } from "@/content/site";

/** Facts are authored in a fixed order; the icons follow it. */
const factIcons = [MapPin, Crosshair, Layers, GraduationCap];

/**
 * The one photographic section: the portrait is the whole background, set on
 * near-black so it reads as a studio, with a grade only where the copy sits.
 */
export function About({ copy }: { copy: Dictionary["about"] }) {
  return (
    <Section
      id="about"
      labelledBy="about-title"
      tone="dark"
      className="section-y about-section isolate overflow-hidden bg-void text-paper"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="about-plate absolute"
          style={{ aspectRatio: `${portrait.width} / ${portrait.height}` }}
        >
          <Image
            src={portrait.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="about-photo object-contain"
          />
        </div>
        <div className="about-grade absolute inset-0" />
        <div className="grain absolute inset-0 opacity-[0.05]" />
      </div>

      <Container>
        <div
          data-reveal="line"
          className="h-px w-full origin-left bg-line-invert"
        />

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          {/* Identity ----------------------------------------------------- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="meta flex items-center gap-3 text-paper/60">
              <span aria-hidden="true" className="h-px w-6 bg-red" />
              {copy.eyebrow}
            </p>

            <h2
              id="about-title"
              data-reveal="up"
              className="display-section about-copy mt-5 text-paper"
            >
              {copy.name}
            </h2>

            <p
              data-reveal="up"
              data-rd="1"
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm"
            >
              <span className="font-medium text-paper">{copy.role}</span>
              <span aria-hidden="true" className="h-3 w-px bg-line-invert" />
              <span className="text-paper/65">{copy.location}</span>
            </p>
          </div>

          {/* Narrative ---------------------------------------------------- */}
          <div>
            <div className="max-w-2xl space-y-6">
              {copy.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  data-reveal="up"
                  data-rd={String(index + 1)}
                  className={
                    index === 0
                      ? "about-copy text-lg leading-relaxed font-medium text-paper sm:text-[1.3125rem]"
                      : "about-copy body-lg text-paper/70"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div data-reveal="up" className="mt-14">
              <div className="flex items-center gap-3.5">
                <span className="meta text-paper/45">{copy.factsLabel}</span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-line-invert"
                />
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line-invert bg-line-invert sm:grid-cols-2">
                {copy.facts.map((fact, index) => {
                  const Icon = factIcons[index % factIcons.length];

                  return (
                    <div
                      key={fact.label}
                      className="group relative bg-ink p-5 transition-colors duration-300 hover:bg-ink-raised"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-red transition-transform duration-500 ease-[var(--ease-spatial)] group-hover:scale-x-100"
                      />
                      <div className="flex items-start justify-between gap-4">
                        <dt className="eyebrow text-paper/45">{fact.label}</dt>
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-paper/35 transition-colors duration-300 group-hover:text-red"
                        />
                      </div>
                      <dd className="mt-2.5 text-[15px] font-medium text-paper">
                        {fact.value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
