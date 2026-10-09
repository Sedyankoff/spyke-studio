"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { SpykeLogo } from "@/components/brand/spyke-logo";
import { useCommand } from "@/components/command/command-context";
import { LocaleSwitch } from "@/components/ui/locale-switch";
import { SocialLinks } from "@/components/ui/social-links";
import { navSectionIds } from "@/content";
import type { Dictionary } from "@/content/dictionary";
import type { NavSectionId } from "@/content/schema";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n/config";
import {
  createScrollDriver,
  sectionTop,
  type ScrollTarget,
} from "@/lib/scroll-driver";
import { cn } from "@/lib/utils";

interface CommandPanelProps {
  locale: Locale;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Preview only when at least this much of the page is visible beside the panel. */
const MIN_VISIBLE_PAGE = 280;

export function CommandPanel({ locale, nav, common }: CommandPanelProps) {
  const { open, closeCommand, activeSection } = useCommand();
  const panelRef = useRef<HTMLDivElement>(null);
  const [driver] = useState(createScrollDriver);
  const [hovered, setHovered] = useState<NavSectionId | null>(null);

  /** Where the reader was when the panel opened, and whether they chose a section. */
  const originRef = useRef(0);
  const committedRef = useRef<NavSectionId | null>(null);

  useEffect(() => {
    if (!open) return;

    originRef.current = window.scrollY;
    committedRef.current = null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCommand();
    };

    document.documentElement.classList.add("command-scroll-lock");
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.documentElement.classList.remove("command-scroll-lock");
      document.removeEventListener("keydown", onKeyDown);

      const committed = committedRef.current;
      if (committed) {
        // Anchor navigation would move focus to the target; do the same.
        const section = document.getElementById(committed);
        if (section) {
          if (!section.hasAttribute("tabindex")) {
            section.setAttribute("tabindex", "-1");
          }
          section.focus({ preventScroll: true });
        }
        return;
      }

      // Dismissed without a choice: the preview was only a preview.
      if (Math.abs(window.scrollY - originRef.current) > 2) {
        glide(originRef.current);
      }
      document
        .querySelector<HTMLElement>('[aria-controls="spyke-command-panel"]')
        ?.focus({ preventScroll: true });
    };
    // `glide` only reads the stable driver.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, closeCommand]);

  useEffect(() => () => driver.stop(), [driver]);

  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    setHovered(null);
  }

  function glide(top: ScrollTarget) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      driver.jump(top);
    } else {
      driver.to(top);
    }
  }

  /** The page moves towards the section under the pointer — the latest one wins. */
  function preview(id: NavSectionId) {
    setHovered(id);
    const panel = panelRef.current;
    if (!panel) return;
    if (window.innerWidth - panel.offsetWidth < MIN_VISIBLE_PAGE) return;
    glide(() => sectionTop(id));
  }

  function commit(event: React.MouseEvent, id: NavSectionId) {
    event.preventDefault();
    glide(() => sectionTop(id));
    committedRef.current = id;
    history.replaceState(null, "", `#${id}`);
    closeCommand();
  }

  const highlighted: NavSectionId | null =
    hovered ?? (activeSection === "hero" ? null : activeSection);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* The page stays in view beside the panel; clicking it dismisses. */}
          <m.button
            type="button"
            tabIndex={-1}
            aria-label={nav.close}
            onClick={closeCommand}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 cursor-default bg-void/45 sm:bg-void/20"
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
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto overscroll-contain bg-ink text-paper outline-none sm:w-[max(22rem,28vw)] sm:border-l sm:border-line-invert"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:py-3.5 min-[1000px]:justify-end">
              {/* Wide screens keep the header's own logo in view beside the panel. */}
              <span
                role="img"
                aria-label={siteConfig.name}
                className="h-8 w-fit min-[1000px]:hidden"
              >
                <SpykeLogo tone="paper" sizes="120px" />
              </span>

              <button
                type="button"
                onClick={closeCommand}
                aria-label={nav.close}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-line-invert text-paper/75 transition-colors duration-200 hover:border-paper hover:bg-paper hover:text-ink"
              >
                <X className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:rotate-90" />
              </button>
            </div>

            <nav
              aria-label={nav.label}
              className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-10"
            >
              <ul
                onMouseLeave={() => setHovered(null)}
                className="border-t border-line-invert-soft"
              >
                {navSectionIds.map((id, index) => {
                  const item = nav.items[id];
                  const isOn = highlighted === id;

                  return (
                    <m.li
                      key={id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.42,
                        delay: 0.1 + index * 0.035,
                        ease: EASE,
                      }}
                      className="border-b border-line-invert-soft"
                    >
                      <a
                        href={`#${id}`}
                        onClick={(event) => commit(event, id)}
                        onPointerEnter={(event) => {
                          if (event.pointerType === "mouse") preview(id);
                        }}
                        onFocus={() => preview(id)}
                        aria-current={activeSection === id ? "true" : undefined}
                        className="relative flex min-h-16 flex-col justify-center py-3.5"
                      >
                        {/* One marker: a red rule on the panel's edge. */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute top-3 bottom-3 -left-5 w-[2px] origin-center bg-red transition-transform duration-300 ease-[var(--ease-spatial)] sm:-left-10",
                            isOn ? "scale-y-100" : "scale-y-0",
                          )}
                        />
                        <span
                          className={cn(
                            "font-display text-[1.75rem] leading-none font-semibold tracking-[0.01em] uppercase transition-colors duration-300 sm:text-[1.625rem]",
                            isOn ? "text-paper" : "text-paper/45",
                          )}
                        >
                          {item.label}
                        </span>
                        <span
                          className={cn(
                            "mt-1.5 hidden text-xs transition-colors duration-300 sm:block",
                            isOn ? "text-paper/55" : "text-paper/30",
                          )}
                        >
                          {item.hint}
                        </span>
                      </a>
                    </m.li>
                  );
                })}
              </ul>
            </nav>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.32 }}
              className="flex flex-wrap items-center justify-between gap-5 border-t border-line-invert-soft px-5 pt-6 pb-7 sm:px-10"
            >
              <LocaleSwitch
                locale={locale}
                label={common.switchLanguage}
                tone="paper"
                className="sm:hidden"
              />
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-underline font-mono text-xs tracking-wide text-paper/60 transition-colors hover:text-paper"
              >
                {siteConfig.email}
              </a>
              <SocialLinks tone="paper" />
            </m.div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
