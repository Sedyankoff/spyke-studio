import { GraduationCap, IdCard, Languages } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { Tag } from "@/components/ui/tag";
import { educationEntries } from "@/content/cv";
import { formatPeriod } from "@/content";
import type { Dictionary } from "@/content/dictionary";

interface EducationProps {
  copy: Dictionary["education"];
  present: string;
}

const cardClassName =
  "group relative overflow-hidden rounded-card border border-line bg-paper-raised p-6 transition-colors duration-300 hover:border-ink/25 sm:p-8";

const cardAccent = (
  <span
    aria-hidden="true"
    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-red transition-transform duration-[600ms] ease-[var(--ease-spatial)] group-hover:scale-x-100"
  />
);

export function Education({ copy, present }: EducationProps) {
  return (
    <Section
      id="education"
      labelledBy="education-title"
      className="section-y bg-paper-sunken"
    >
      <Container>
        <SectionIntro
          titleId="education-title"
          index="05"
          eyebrow={copy.eyebrow}
          title={copy.title}
        />

        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-8">
          <div data-reveal="up" className={cardClassName}>
            {cardAccent}

            <div className="flex items-center justify-between gap-4">
              <h3 className="eyebrow text-ink-mute">{copy.academic}</h3>
              <GraduationCap
                aria-hidden="true"
                className="h-5 w-5 text-ink-mute/60 transition-colors duration-300 group-hover:text-red"
              />
            </div>

            {educationEntries.map((entry) => {
              const item = copy.entries[entry.id];

              return (
                <div key={entry.id} className="relative mt-7 pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 left-0 h-[7px] w-[7px] rounded-full bg-red"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-2 left-[3px] h-[calc(100%-1rem)] w-px bg-gradient-to-b from-red/45 to-transparent"
                  />

                  <p className="font-display text-2xl font-semibold text-ink sm:text-[1.75rem]">
                    {formatPeriod(entry.period, present)}
                  </p>
                  <h4 className="mt-3 text-lg font-semibold text-ink sm:text-xl">
                    {item.degree}
                  </h4>
                  <p className="mt-1 text-sm text-ink-mute">
                    {item.institution}
                  </p>
                  <p className="body-base mt-4 max-w-xl text-ink-soft">
                    {item.summary}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.focus.map((area) => (
                      <li key={area}>
                        <Tag>{area}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div data-reveal="up" data-rd="1" className={cardClassName}>
            {cardAccent}

            <h3 className="eyebrow text-ink-mute">{copy.additional}</h3>

            <dl className="mt-7 space-y-8">
              <div>
                <dt className="flex items-center gap-2.5 text-xs text-ink-mute">
                  <Languages aria-hidden="true" className="h-4 w-4 text-red" />
                  {copy.languagesLabel}
                </dt>
                <dd className="mt-3.5 space-y-2.5">
                  {copy.languages.map((language) => (
                    <p
                      key={language.name}
                      className="flex items-baseline gap-3 text-[15px] text-ink"
                    >
                      {language.name}
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-line"
                      />
                      <span className="font-mono text-[11px] text-ink-mute">
                        {language.level ?? "—"}
                      </span>
                    </p>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-2.5 text-xs text-ink-mute">
                  <IdCard aria-hidden="true" className="h-4 w-4 text-red" />
                  {copy.licenceLabel}
                </dt>
                <dd className="mt-3.5 text-[15px] text-ink">
                  {copy.licenceValue}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
