import { Crosshair, GraduationCap, Layers, MapPin } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/content/dictionary";

/** Facts are authored in a fixed order; the icons follow it. */
const factIcons = [MapPin, Crosshair, Layers, GraduationCap];

export function About({ copy }: { copy: Dictionary["about"] }) {
  return (
    <Section id="about" labelledBy="about-title" className="section-y">
      <Container>
        <div data-reveal="line" className="rule origin-left" />

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          {/* Identity ----------------------------------------------------- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="meta flex items-center gap-3 text-ink-mute">
              <span aria-hidden="true" className="h-px w-6 bg-red" />
              {copy.eyebrow}
            </p>

            <h2
              id="about-title"
              data-reveal="up"
              className="display-section mt-5 text-ink"
            >
              {copy.name}
            </h2>

            <p
              data-reveal="up"
              data-rd="1"
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm"
            >
              <span className="font-medium text-ink">{copy.role}</span>
              <span aria-hidden="true" className="h-3 w-px bg-line" />
              <span className="text-ink-soft">{copy.location}</span>
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
                      ? "text-lg leading-relaxed font-medium text-ink sm:text-[1.3125rem]"
                      : "body-lg text-ink-soft"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

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
