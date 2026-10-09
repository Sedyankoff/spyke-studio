import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { Tag } from "@/components/ui/tag";
import { formatDate } from "@/content";
import { experienceEntries } from "@/content/cv";
import type { Dictionary } from "@/content/dictionary";
import { cn } from "@/lib/utils";

interface ExperienceProps {
  copy: Dictionary["experience"];
  common: Pick<Dictionary["common"], "present" | "months">;
}

export function Experience({ copy, common }: ExperienceProps) {
  return (
    <Section id="experience" labelledBy="experience-title" className="section-y">
      <Container>
        <SectionIntro
          titleId="experience-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
        />

        {/* The rail: a static hairline with the red segment drawn over it. */}
        <div className="relative mt-12 pl-7 sm:mt-14 sm:pl-10">
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
              const from = formatDate(entry.period.from, common.months);
              const to = isCurrent
                ? common.present
                : entry.period.to && entry.period.to !== entry.period.from
                  ? formatDate(entry.period.to, common.months)
                  : null;

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

                  <div className="grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
                    <div>
                      <p className="flex flex-wrap items-baseline gap-x-2 font-display text-xl font-semibold text-ink uppercase sm:text-2xl">
                        <span className="whitespace-nowrap">{from}</span>
                        {to && (
                          <>
                            <span aria-hidden="true" className="text-red">
                              —
                            </span>
                            <span className="whitespace-nowrap text-ink-mute">
                              {to}
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
                      <h3 className="text-lg font-semibold text-ink sm:text-xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-ink-mute">
                        <span className="font-medium text-ink-soft">
                          {item.company}
                        </span>
                        <span aria-hidden="true" className="h-3 w-px bg-line" />
                        {item.location}
                      </p>
                      <p className="body-base mt-3.5 max-w-2xl text-ink-soft">
                        {item.summary}
                      </p>
                      {item.tags.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <li key={tag}>
                              <Tag className="border-ink/25 text-ink">{tag}</Tag>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.areas && item.areas.length > 0 && (
                        <div className="mt-5 max-w-2xl">
                          <p className="eyebrow text-ink-mute">
                            {copy.areasLabel}
                          </p>
                          <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                            {item.areas.join(" · ")}
                          </p>
                        </div>
                      )}
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
