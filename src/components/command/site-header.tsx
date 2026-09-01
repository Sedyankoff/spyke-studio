"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { SpykeLogo } from "@/components/brand/spyke-logo";
import { useCommand } from "@/components/command/command-context";
import { LocaleSwitch } from "@/components/ui/locale-switch";
import type { Dictionary } from "@/content/dictionary";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  locale: Locale;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
}

export function SiteHeader({ locale, nav, common }: SiteHeaderProps) {
  const { open, toggleCommand, activeSection } = useCommand();
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (frameRef.current !== null) return;

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        setScrolled(scrollTop > 16);

        const travel = scrollHeight - clientHeight;
        const progress = travel > 0 ? Math.min(1, scrollTop / travel) : 0;
        progressRef.current?.style.setProperty(
          "transform",
          `scaleX(${progress.toFixed(4)})`,
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, []);

  const currentLabel =
    activeSection === "hero"
      ? nav.sectionsLabel
      : nav.items[activeSection].label;

  return (
    <header
      inert={open}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-line-soft bg-paper/88 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-3.5">
        <a
          href="#hero"
          aria-label={siteConfig.name}
          className="h-7 rounded-sm sm:h-8"
        >
          <SpykeLogo eager sizes="150px" />
        </a>

        <div className="flex items-center gap-2">
          <LocaleSwitch locale={locale} label={common.switchLanguage} />

          <button
            type="button"
            onClick={toggleCommand}
            aria-expanded={open}
            aria-controls="spyke-command-panel"
            aria-label={nav.open}
            className="group flex h-11 items-center gap-3 rounded-full border border-line bg-paper-raised py-1 pr-1 pl-4 transition-colors duration-200 hover:border-ink"
          >
            <span className="hidden h-[18px] overflow-hidden sm:block">
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={currentLabel}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="meta block leading-[18px] whitespace-nowrap text-ink-mute transition-colors duration-200 group-hover:text-ink"
                >
                  {currentLabel}
                </m.span>
              </AnimatePresence>
            </span>

            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-ink text-paper">
              <span
                aria-hidden="true"
                className="absolute inset-0 scale-0 rounded-full bg-red transition-transform duration-[420ms] ease-[var(--ease-spatial)] group-hover:scale-100"
              />
              <span className="relative flex w-4 flex-col items-end gap-[3px]">
                <span className="h-[2px] w-full rounded-full bg-current" />
                <span className="h-[2px] w-2/3 rounded-full bg-current transition-[width] duration-300 ease-[var(--ease-spatial)] group-hover:w-full" />
                <span className="h-[2px] w-1/3 rounded-full bg-current transition-[width] delay-75 duration-300 ease-[var(--ease-spatial)] group-hover:w-full" />
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Reading progress — the header's only piece of red. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-px origin-left bg-red transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        ref={progressRef}
        style={{ transform: "scaleX(0)" }}
      />
    </header>
  );
}
