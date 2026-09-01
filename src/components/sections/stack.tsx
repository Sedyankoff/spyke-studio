import {
  ArrowUpRight,
  GitBranch,
  KeyRound,
  Layers,
  Plug,
  Radio,
  Waves,
  Webhook,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { TechIcon } from "@/components/ui/tech-icon";
import { brandIcons } from "@/components/ui/brand-icons";
import { capabilityIds, stackGroups } from "@/content/stack";
import type { Dictionary } from "@/content/dictionary";
import type { CapabilityId } from "@/content/schema";
import { cn } from "@/lib/utils";

const capabilityIcons: Record<
  CapabilityId,
  React.ComponentType<{ className?: string }>
> = {
  rest: Webhook,
  websockets: Radio,
  auth: KeyRound,
  multitenancy: Layers,
  realtime: Waves,
  integrations: Plug,
  cicd: GitBranch,
};

export function Stack({ copy }: { copy: Dictionary["stack"] }) {
  return (
    <Section
      id="stack"
      labelledBy="stack-title"
      className="section-y bg-paper-sunken"
    >
      <Container>
        <SectionIntro
          titleId="stack-title"
          index="02"
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
        />

        <div className="mt-14 space-y-12 sm:mt-16">
          {stackGroups.map((group, groupIndex) => (
            <div
              key={group.id}
              className="grid gap-5 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-10"
            >
              <h3
                data-reveal="up"
                className="flex items-center gap-3 pt-1 lg:flex-col lg:items-start lg:gap-2"
              >
                <span className="meta text-red-deep">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow text-ink-mute">
                  {copy.groups[group.id]}
                </span>
              </h3>

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {group.technologies.map((technology, index) => (
                  <li
                    key={technology.id}
                    data-reveal="up"
                    data-rd={String(Math.min(index + 1, 4))}
                  >
                    <div
                      className="group relative flex h-full items-center gap-3.5 overflow-hidden rounded-tile border border-line bg-paper-raised p-4 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-spatial)] hover:-translate-y-1 hover:border-ink hover:shadow-[0_14px_36px_-20px_rgb(27_25_23/0.55)]"
                      style={
                        {
                          "--brand": brandIcons[technology.icon].hex,
                        } as React.CSSProperties
                      }
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-red transition-transform duration-500 ease-[var(--ease-spatial)] group-hover:scale-x-100"
                      />

                      <span className="text-ink-soft transition-[color,transform] duration-300 ease-[var(--ease-spatial)] group-hover:scale-110 group-hover:text-[var(--brand)]">
                        <TechIcon
                          id={technology.icon}
                          className="h-7 w-7 sm:h-8 sm:w-8"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink">
                          {technology.name}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block truncate font-mono text-[11px] transition-[color,opacity] duration-300",
                            technology.note
                              ? "text-ink-mute group-hover:text-red-deep"
                              : "text-ink-mute opacity-0 group-hover:opacity-100",
                          )}
                        >
                          {technology.note ?? copy.groups[group.id]}
                        </span>
                      </span>

                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-red opacity-0 transition-all duration-300 ease-[var(--ease-spatial)] group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-5 border-t border-line pt-10 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-10">
          <h3 data-reveal="up" className="eyebrow pt-1 text-ink-mute">
            {copy.capabilitiesTitle}
          </h3>
          <ul className="flex flex-wrap gap-2.5">
            {capabilityIds.map((id, index) => {
              const Icon = capabilityIcons[id];

              return (
                <li
                  key={id}
                  data-reveal="up"
                  data-rd={String(Math.min(index + 1, 6))}
                >
                  <span className="group inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-3.5 py-2 text-[13px] text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink">
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 text-red transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:-rotate-12"
                    />
                    {copy.capabilities[id]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
