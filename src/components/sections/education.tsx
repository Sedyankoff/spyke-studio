import { GraduationCap } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { educationEntries } from "@/content/cv";
import { formatPeriod } from "@/content";
import type { Dictionary } from "@/content/dictionary";

interface EducationProps {
  copy: Dictionary["education"];
  common: Pick<Dictionary["common"], "present" | "months">;
}

const cardClassName =
  "group relative overflow-hidden rounded-card border border-line bg-paper-raised p-6 transition-colors duration-300 hover:border-ink/25 sm:p-8";

const cardAccent = (
  <span
    aria-hidden="true"
    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-red transition-transform duration-[600ms] ease-[var(--ease-spatial)] group-hover:scale-x-100"
  />
);

export function Education({ copy, common }: EducationProps) {
  return (
    <Section
      id="education"
      labelledBy="education-title"
      className="section-y bg-paper-sunken"
    >
      <Container>
        <SectionIntro
          titleId="education-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
        />

        {educationEntries.map((entry) => {
          const item = copy.entries[entry.id];
          const period = formatPeriod(entry.period, common.present, common.months);

          return (
            <div
              key={entry.id}
              className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-8"
            >
              <div data-reveal="up" className={cardClassName}>
                {cardAccent}

                <div className="flex items-center justify-between gap-4">
                  <h3 className="eyebrow text-ink-mute">{copy.academic}</h3>
                  <GraduationCap
                    aria-hidden="true"
                    className="h-5 w-5 text-ink-mute/60 transition-colors duration-300 group-hover:text-red"
                  />
                </div>

                <div className="relative mt-7 pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 left-0 h-[7px] w-[7px] rounded-full bg-red"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-2 left-[3px] h-[calc(100%-1rem)] w-px bg-gradient-to-b from-red/45 to-transparent"
                  />

                  <h4 className="text-lg font-semibold text-ink sm:text-xl">
                    {item.degree}
                  </h4>
                  <p className="mt-1 text-sm text-ink-mute">
                    {item.institution}
                  </p>
                  <p className="body-base mt-4 max-w-xl text-ink-soft">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div data-reveal="up" data-rd="1" className={cardClassName}>
                {cardAccent}

                <h3 className="eyebrow text-ink-mute">{copy.statusTitle}</h3>

                <dl className="mt-7 space-y-6">
                  <div>
                    <dt className="text-xs text-ink-mute">
                      {copy.standingLabel}
                    </dt>
                    <dd className="mt-1.5 font-display text-2xl font-semibold text-ink uppercase">
                      {item.standing}
                    </dd>
                  </div>
                  <div className="flex items-baseline gap-3 border-t border-line pt-5">
                    <dt className="text-xs text-ink-mute">{copy.periodLabel}</dt>
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                    <dd className="text-[15px] text-ink">{period}</dd>
                  </div>
                  {entry.expectedGraduation && (
                    <div className="flex items-baseline gap-3">
                      <dt className="text-xs text-ink-mute">
                        {copy.expectedLabel}
                      </dt>
                      <span aria-hidden="true" className="h-px flex-1 bg-line" />
                      <dd className="text-[15px] text-ink">
                        {entry.expectedGraduation}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          );
        })}
      </Container>
    </Section>
  );
}
