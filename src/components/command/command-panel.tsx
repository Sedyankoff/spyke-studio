"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { SpykeLogo } from "@/components/brand/spyke-logo";
import { useCommand } from "@/components/command/command-context";
import { NavPreview } from "@/components/command/nav-preview";
import { LocaleSwitch } from "@/components/ui/locale-switch";
import { SocialLinks } from "@/components/ui/social-links";
import { navSectionIds } from "@/content";
import type { Dictionary } from "@/content/dictionary";
import type { NavPreviewData } from "@/content/nav-preview";
import type { NavSectionId } from "@/content/schema";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface CommandPanelProps {
  locale: Locale;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
  preview: NavPreviewData;
}

export function CommandPanel({
  locale,
  nav,
  common,
  preview,
}: CommandPanelProps) {
  const { open, closeCommand, activeSection } = useCommand();
  const panelRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<NavSectionId | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCommand();
    };

    document.documentElement.classList.add("command-scroll-lock");
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.documentElement.classList.remove("command-scroll-lock");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeCommand]);

  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    setHovered(null);
  }

  /** Hover wins; otherwise the preview tracks wherever the reader already is. */
  const fallback: NavSectionId =
    activeSection === "hero" ? navSectionIds[0] : activeSection;
  const previewSection = hovered ?? fallback;
  const previewIndex = navSectionIds.indexOf(previewSection);

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.button
            type="button"
            aria-label={nav.close}
            onClick={closeCommand}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 cursor-default bg-ink/40 lg:hidden"
          />

          <m.div
            id="spyke-command-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={nav.label}
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[34rem] flex-col overflow-hidden bg-ink text-paper outline-none lg:inset-0 lg:grid lg:max-w-none lg:grid-cols-[minmax(0,1fr)_min(34rem,44vw)]"
          >
            <NavPreview
              section={previewSection}
              index={previewIndex}
              nav={nav}
              data={preview}
            />

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto border-line-invert lg:border-l">
              <div className="flex items-center justify-between gap-4 px-6 py-5 sm:px-9 lg:py-4">
                <span
                  role="img"
                  aria-label={siteConfig.name}
                  className="h-6 sm:h-7"
                >
                  <SpykeLogo tone="paper" sizes="120px" />
                </span>

                <button
                  type="button"
                  onClick={closeCommand}
                  aria-label={nav.close}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-line-invert text-paper/70 transition-colors duration-200 hover:border-red hover:bg-red hover:text-paper"
                >
                  <X className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:rotate-90" />
                </button>
              </div>

              <p className="eyebrow flex items-center gap-2.5 px-6 pb-4 text-paper/35 sm:px-9 lg:pb-3">
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-red"
                />
                {nav.sectionsLabel}
              </p>

              <nav aria-label={nav.label} className="px-6 sm:px-9">
                <ul onMouseLeave={() => setHovered(null)}>
                  {navSectionIds.map((id, index) => {
                    const item = nav.items[id];
                    const isActive = activeSection === id;
                    const isPreviewed = previewSection === id;

                    return (
                      <m.li
                        key={id}
                        initial={{ opacity: 0, x: 28 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1 + index * 0.045,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="border-b border-line-invert-soft last:border-b-0"
                      >
                        <a
                          href={`#${id}`}
                          onClick={closeCommand}
                          onMouseEnter={() => setHovered(id)}
                          onFocus={() => setHovered(id)}
                          aria-current={isActive ? "true" : undefined}
                          className="group relative flex items-center gap-4 py-4 sm:gap-6 lg:py-3.5"
                        >
                          {/* Red rail — the marker that follows the pointer. */}
                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute top-2 bottom-2 -left-6 w-[2px] origin-center bg-red transition-transform duration-300 ease-[var(--ease-spatial)] sm:-left-9",
                              isPreviewed ? "scale-y-100" : "scale-y-0",
                            )}
                          />

                          <span
                            className={cn(
                              "meta w-6 shrink-0 transition-colors duration-200",
                              isPreviewed || isActive
                                ? "text-red-light"
                                : "text-paper/30",
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
                            className={cn(
                              "min-w-0 flex-1 transition-transform duration-300 ease-[var(--ease-spatial)]",
                              isPreviewed && "translate-x-1.5",
                            )}
                          >
                            <span
                              className={cn(
                                "display-card block transition-colors duration-200",
                                isActive || isPreviewed
                                  ? "text-paper"
                                  : "text-paper/45",
                              )}
                            >
                              {item.label}
                            </span>
                            <span
                              className={cn(
                                "mt-1 block font-mono text-[11px] tracking-wide transition-colors duration-200",
                                isPreviewed ? "text-paper/55" : "text-paper/30",
                              )}
                            >
                              {item.hint}
                            </span>
                          </span>

                          <ArrowUpRight
                            aria-hidden="true"
                            className={cn(
                              "h-4 w-4 shrink-0 transition-all duration-300 ease-[var(--ease-spatial)]",
                              isPreviewed
                                ? "translate-x-0 text-red-light opacity-100"
                                : "-translate-x-1.5 text-paper opacity-0",
                            )}
                          />
                        </a>
                      </m.li>
                    );
                  })}
                </ul>
              </nav>

              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.34 }}
                className="mt-auto flex flex-wrap items-end justify-between gap-5 px-6 pt-12 pb-8 sm:px-9 lg:pt-8 lg:pb-6"
              >
                <div>
                  <p className="meta text-paper/35">{common.languageLabel}</p>
                  <LocaleSwitch
                    locale={locale}
                    label={common.switchLanguage}
                    tone="paper"
                    className="mt-2.5"
                  />
                </div>
                <div className="flex flex-col items-start gap-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="link-underline font-mono text-xs tracking-wide text-paper/55 transition-colors hover:text-paper"
                  >
                    {siteConfig.email}
                  </a>
                  <SocialLinks tone="paper" />
                </div>
              </m.div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
