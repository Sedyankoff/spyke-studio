import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { Tag } from "@/components/ui/tag";
import { experienceEntries } from "@/content/cv";
import type { Dictionary } from "@/content/dictionary";
import { cn } from "@/lib/utils";

interface ExperienceProps {
  copy: Dictionary["experience"];
  present: string;
}

export function Experience({ copy, present }: ExperienceProps) {
  return (
    <Section id="experience" labelledBy="experience-title" className="section-y">
      <Container>
        <SectionIntro
          titleId="experience-title"
          index="04"
          eyebrow={copy.eyebrow}
          title={copy.title}
        />

        <h3 className="eyebrow mt-14 text-ink-mute sm:mt-16">
          {copy.professional}
        </h3>

        {/* The rail: a static hairline with the red segment drawn over it. */}
        <div className="relative mt-8 pl-7 sm:pl-10">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 w-px bg-line"
          />
          <span
            aria-hidden="true"
            data-reveal="line-y"
            className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-red via-red/45 to-transparent"
          />

          <ol className="archive">
            {experienceEntries.map((entry, index) => {
              const item = copy.entries[entry.id];
              const isCurrent = entry.period.ongoing;
              /** A single-year role should read "2025", not "2025 — 2025". */
              const endsElsewhere =
                isCurrent || (!!entry.period.to && entry.period.to !== entry.period.from);

              return (
                <li
                  key={entry.id}
                  data-reveal="up"
                  className={cn(
                    "archive-item group relative py-9 transition-colors duration-300",
                    index > 0 && "border-t border-line",
                  )}
                >
                  {/* Marker sits on the rail. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-[2.85rem] -left-7 h-[9px] w-[9px] rounded-full transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:scale-125 sm:-left-10",
                      isCurrent
                        ? "bg-red"
                        : "border border-ink-mute bg-paper group-hover:border-red",
                    )}
                    style={{ translate: "-4px 0" }}
                  />
                  {isCurrent && (
                    <span
                      aria-hidden="true"
                      className="absolute top-[2.85rem] -left-7 h-[9px] w-[9px] animate-ping rounded-full bg-red/50 sm:-left-10"
                      style={{ translate: "-4px 0" }}
                    />
                  )}

                  <div className="grid gap-4 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
                    <div>
                      <p className="flex items-baseline gap-2 font-display text-2xl font-semibold text-ink sm:text-[1.75rem]">
                        <span>{entry.period.from}</span>
                        {endsElsewhere && (
                          <>
                            <span aria-hidden="true" className="text-red">
                              —
                            </span>
                            <span className="text-ink-mute">
                              {isCurrent ? present : entry.period.to}
                            </span>
                          </>
                        )}
                      </p>
                      <span
                        aria-hidden="true"
                        className="mt-3 block h-px w-8 origin-left bg-line transition-[width,background-color] duration-500 ease-[var(--ease-spatial)] group-hover:w-16 group-hover:bg-red"
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-ink sm:text-xl">
                        {item.role}
                      </h4>
                      <p className="mt-1 flex items-center gap-2.5 text-sm text-ink-mute">
                        {item.company}
                        {isCurrent && (
                          <span className="meta inline-flex items-center gap-1.5 text-red-deep">
                            <span
                              aria-hidden="true"
                              className="h-1 w-1 rounded-full bg-red"
                            />
                            {present}
                          </span>
                        )}
                      </p>
                      <p className="body-base mt-3.5 max-w-2xl text-ink-soft">
                        {item.summary}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <li key={tag}>
                            <Tag>{tag}</Tag>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
