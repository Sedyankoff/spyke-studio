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

/**
 * Three equal-weight columns: the outer two are `1fr` each, so the logo sits
 * on the viewport's centre line regardless of what the side controls contain.
 *
 * The header reads the surface beneath it — any element marked
 * `data-tone="dark"` — and switches between ink and paper treatments.
 */
export function SiteHeader({ locale, nav, common }: SiteHeaderProps) {
  const { open, toggleCommand, activeSection } = useCommand();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const darkSurfaces = Array.from(
      document.querySelectorAll<HTMLElement>('[data-tone="dark"]'),
    );

    const measure = () => {
      frameRef.current = null;
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      setScrolled(scrollTop > 16);

      const probe = (headerRef.current?.offsetHeight ?? 72) / 2;
      setDark(
        darkSurfaces.some((surface) => {
          const rect = surface.getBoundingClientRect();
          return rect.top <= probe && rect.bottom > probe;
        }),
      );

      const travel = scrollHeight - clientHeight;
      const progress = travel > 0 ? Math.min(1, scrollTop / travel) : 0;
      progressRef.current?.style.setProperty(
        "transform",
        `scaleX(${progress.toFixed(4)})`,
      );
    };

    const schedule = () => {
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
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
      ref={headerRef}
      inert={open}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        !scrolled && "border-transparent",
        scrolled && dark && "border-line-invert-soft bg-ink/80 backdrop-blur-md",
        scrolled && !dark && "border-line-soft bg-paper/85 backdrop-blur-md",
      )}
    >
      {/* More air above the logo at the top of the page; compact once scrolled. */}
      <div
        className={cn(
          "grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 transition-[padding] duration-300 sm:px-8",
          scrolled ? "py-3" : "pt-5 pb-3 sm:pt-6 lg:pt-7",
        )}
      >
        <LocaleSwitch
          locale={locale}
          label={common.switchLanguage}
          tone={dark ? "paper" : "ink"}
          className="justify-self-start"
        />

        <a
          href="#hero"
          aria-label={siteConfig.name}
          className={cn(
            "relative block h-9 rounded-sm transition-opacity duration-300 sm:h-11 lg:h-[3.375rem]",
            // Below ~1000px the open panel would cut through the logo; it shows its own.
            open && "max-[999px]:opacity-0",
          )}
        >
          <SpykeLogo
            eager
            sizes="(min-width: 1024px) 160px, 130px"
            className={cn(
              "transition-opacity duration-300",
              dark ? "opacity-0" : "opacity-100",
            )}
          />
          <SpykeLogo
            eager
            tone="paper"
            sizes="(min-width: 1024px) 160px, 130px"
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              dark ? "opacity-100" : "opacity-0",
            )}
          />
        </a>

        <button
          type="button"
          onClick={toggleCommand}
          aria-expanded={open}
          aria-controls="spyke-command-panel"
          aria-label={nav.open}
          className={cn(
            "group flex h-11 items-center gap-3 justify-self-end rounded-full border py-1 pr-1 pl-1 transition-colors duration-300 sm:pl-4",
            dark
              ? "border-line-invert hover:border-paper/60"
              : "border-line bg-paper-raised hover:border-ink",
          )}
        >
          <span className="hidden h-[18px] overflow-hidden sm:block">
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={currentLabel}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "meta block leading-[18px] whitespace-nowrap transition-colors duration-300",
                  dark
                    ? "text-paper/65 group-hover:text-paper"
                    : "text-ink-mute group-hover:text-ink",
                )}
              >
                {currentLabel}
              </m.span>
            </AnimatePresence>
          </span>

          <span
            className={cn(
              "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full transition-colors duration-300",
              dark ? "bg-paper text-ink" : "bg-ink text-paper",
            )}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 scale-0 rounded-full bg-red transition-transform duration-[420ms] ease-[var(--ease-spatial)] group-hover:scale-100"
            />
            <span className="relative flex w-4 flex-col items-end gap-[3px] transition-colors duration-200 group-hover:text-paper">
              <span className="h-[2px] w-full rounded-full bg-current" />
              <span className="h-[2px] w-2/3 rounded-full bg-current transition-[width] duration-300 ease-[var(--ease-spatial)] group-hover:w-full" />
              <span className="h-[2px] w-1/3 rounded-full bg-current transition-[width] delay-75 duration-300 ease-[var(--ease-spatial)] group-hover:w-full" />
            </span>
          </span>
        </button>
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
