import {
  ArrowLeftRight,
  GitBranch,
  Layers,
  Plug,
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
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
        />

        <div className="mt-14 space-y-12 sm:mt-16">
          {stackGroups.map((group) => (
            <div
              key={group.id}
              className="grid gap-5 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-10"
            >
              <h3 data-reveal="up" className="eyebrow pt-1 text-ink-mute lg:pt-5">
                {copy.groups[group.id]}
              </h3>

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {group.technologies.map((technology, index) => (
                  <li
                    key={technology.id}
                    data-reveal="up"
                    data-rd={String(Math.min(index + 1, 4))}
                  >
                    <div
                      className={cn(
                        "group relative flex h-full items-center gap-3.5 overflow-hidden rounded-tile border bg-paper-raised p-4 transition-colors duration-300 hover:border-ink/40",
                        technology.primary ? "border-ink/25" : "border-line",
                      )}
                      style={
                        {
                          "--brand": technology.icon
                            ? brandIcons[technology.icon].hex
                            : "var(--color-ink)",
                        } as React.CSSProperties
                      }
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-red transition-transform duration-500 ease-[var(--ease-spatial)] group-hover:scale-x-100"
                      />

                      <span className="text-ink-soft transition-colors duration-300 group-hover:text-[var(--brand)]">
                        {technology.icon ? (
                          <TechIcon
                            id={technology.icon}
                            className="h-7 w-7 sm:h-8 sm:w-8"
                          />
                        ) : (
                          // No brand mark exists (e.g. WebSockets, a protocol).
                          <ArrowLeftRight
                            aria-hidden="true"
                            strokeWidth={1.6}
                            className="h-7 w-7 sm:h-8 sm:w-8"
                          />
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm leading-tight font-medium text-ink">
                          {technology.name}
                        </span>
                        {technology.primary ? (
                          <span className="mt-0.5 block truncate font-mono text-[11px] text-red-deep">
                            {copy.primaryLabel}
                          </span>
                        ) : (
                          technology.note && (
                            <span className="mt-0.5 block truncate font-mono text-[11px] text-ink-mute">
                              {technology.note}
                            </span>
                          )
                        )}
                      </span>
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
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-3.5 py-2 text-[13px] text-ink-soft">
                    <Icon aria-hidden="true" className="h-4 w-4 text-red" />
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
