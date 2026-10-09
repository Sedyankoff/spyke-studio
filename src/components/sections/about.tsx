import Image from "next/image";
import { BriefcaseBusiness, GraduationCap, Layers, MapPin } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/content/dictionary";
import { portrait } from "@/content/site";

/** Facts are authored in a fixed order; the icons follow it. */
const factIcons = [MapPin, BriefcaseBusiness, Layers, GraduationCap];

/**
 * The identity column carries the name and a modest portrait that falls away
 * into the section's black; the narrative and profile facts sit beside it.
 */
export function About({ copy }: { copy: Dictionary["about"] }) {
  return (
    <Section
      id="about"
      labelledBy="about-title"
      tone="dark"
      className="section-y isolate overflow-hidden bg-void text-paper"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="grain absolute inset-0 opacity-[0.05]" />
      </div>

      <Container>
        <div
          data-reveal="line"
          className="h-px w-full origin-left bg-line-invert"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          {/* Identity ----------------------------------------------------- */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-5 sm:gap-x-10 lg:sticky lg:top-28 lg:grid-cols-1 lg:self-start">
            <div className="self-center lg:self-auto">
              <p className="meta flex items-center gap-3 text-paper/60">
                <span aria-hidden="true" className="h-px w-6 bg-red" />
                {copy.eyebrow}
              </p>

              <h2
                id="about-title"
                data-reveal="up"
                className="display-section mt-5 text-paper"
              >
                {copy.name}
              </h2>

              <p
                data-reveal="up"
                data-rd="1"
                className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:mt-6"
              >
                <span className="font-medium text-paper">{copy.role}</span>
                <span
                  aria-hidden="true"
                  className="h-3 w-px bg-line-invert max-[399px]:hidden"
                />
                <span className="text-paper/65">{copy.location}</span>
              </p>
            </div>

            <div
              data-reveal="fade"
              data-rd="2"
              className="about-portrait relative w-28 min-[400px]:w-36 sm:w-48 lg:mt-10 lg:w-[min(100%,19rem,34svh)]"
              style={{ aspectRatio: `${portrait.width} / ${portrait.height}` }}
            >
              <Image
                src={portrait.src}
                alt={copy.portraitAlt}
                fill
                sizes="(min-width: 1024px) 19rem, (min-width: 640px) 12rem, 9rem"
                className="about-photo object-contain object-bottom"
              />
            </div>
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
                      ? "text-lg leading-relaxed font-medium text-paper sm:text-[1.3125rem]"
                      : "body-lg text-paper/70"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div data-reveal="up" className="mt-14">
              <div className="flex items-center gap-3.5">
                <span className="meta text-paper/55">{copy.factsLabel}</span>
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
                        <dt className="eyebrow text-paper/55">{fact.label}</dt>
                        <Icon
                          aria-hidden="true"
                          strokeWidth={1.75}
                          className="h-4 w-4 shrink-0 text-paper/40 transition-colors duration-300 group-hover:text-red"
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
