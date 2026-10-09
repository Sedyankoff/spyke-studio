"use client";

import { localeNames, otherLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface LocaleSwitchProps {
  locale: Locale;
  label: string;
  className?: string;
  tone?: "ink" | "paper";
}

export function LocaleSwitch({
  locale,
  label,
  className,
  tone = "ink",
}: LocaleSwitchProps) {
  const target = otherLocale(locale);

  // A plain link: each locale has its own root layout, so switching is a
  // full document load either way. On the way out it picks up the current
  // #section, so the reader lands where they were.
  const keepSection = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = `/${target}${window.location.hash}`;
  };

  return (
    <a
      href={`/${target}`}
      hrefLang={target}
      onClick={keepSection}
      aria-label={label}
      className={cn(
        "inline-flex h-9 items-center rounded-full border px-3 font-mono text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-200",
        tone === "ink"
          ? "border-line bg-paper-raised text-ink-soft hover:border-ink hover:bg-ink hover:text-paper"
          : "border-line-invert text-paper/70 hover:border-paper hover:bg-paper hover:text-ink",
        className,
      )}
    >
      {localeNames[target]}
    </a>
  );
}
