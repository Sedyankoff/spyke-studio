import { Building2, Layers, MapPin, Crosshair } from "lucide-react";
import { SpykeMark } from "@/components/brand/spyke-logo";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/content/dictionary";

/** Facts are authored in a fixed order; the icons follow it. */
const factIcons = [MapPin, Crosshair, Layers, Building2];

export function About({ copy }: { copy: Dictionary["about"] }) {
  return (
    <Section id="about" labelledBy="about-title" className="section-y">
      <Container>
        <div data-reveal="line" className="rule origin-left" />

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          {/* Identity ----------------------------------------------------- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3.5">
              <span className="meta text-red-deep">01</span>
              <span aria-hidden="true" className="h-2.5 w-px bg-line" />
              <span className="meta text-ink-mute">{copy.eyebrow}</span>
            </div>

            <h2
              id="about-title"
              data-reveal="up"
              className="display-section mt-5 text-ink"
            >
              {copy.name}
            </h2>

            <div
              data-reveal="line"
              data-rd="1"
              className="mt-6 h-px w-16 bg-red"
            />

            <p
              data-reveal="up"
              data-rd="2"
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm"
            >
              <span className="font-medium text-ink">{copy.role}</span>
              <span aria-hidden="true" className="h-3 w-px bg-line" />
              <span className="inline-flex items-center gap-2 text-ink-soft">
                {copy.studio}
                <span className="inline-block h-3.5">
                  <SpykeMark sizes="16px" />
                </span>
              </span>
            </p>
          </div>

          {/* Narrative ---------------------------------------------------- */}
          <div>
            <ol className="space-y-9">
              {copy.paragraphs.map((paragraph, index) => (
                <li
                  key={paragraph}
                  data-reveal="up"
                  data-rd={String(index + 1)}
                  className="group grid gap-3 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex items-center gap-2 pt-2 font-mono text-[11px] tracking-[0.14em] text-ink-mute sm:pt-2.5"
                  >
                    <span className="h-px w-3 bg-red transition-[width] duration-500 ease-[var(--ease-spatial)] group-hover:w-5" />
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="body-lg text-ink-soft">{paragraph}</p>
                </li>
              ))}
            </ol>

            <div data-reveal="up" className="mt-14">
              <div className="flex items-center gap-3.5">
                <span className="meta text-ink-mute">{copy.factsLabel}</span>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
                {copy.facts.map((fact, index) => {
                  const Icon = factIcons[index % factIcons.length];

                  return (
                    <div
                      key={fact.label}
                      className="group relative bg-paper-raised p-5 transition-colors duration-300 hover:bg-paper"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-red transition-transform duration-500 ease-[var(--ease-spatial)] group-hover:scale-x-100"
                      />
                      <div className="flex items-start justify-between gap-4">
                        <dt className="eyebrow text-ink-mute">{fact.label}</dt>
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-ink-mute/60 transition-colors duration-300 group-hover:text-red"
                        />
                      </div>
                      <dd className="mt-2.5 text-[15px] font-medium text-ink">
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
