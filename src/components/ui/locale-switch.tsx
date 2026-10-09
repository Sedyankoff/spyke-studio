"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const target = otherLocale(locale);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const hash = window.location.hash;
    router.push(`/${target}${hash}`);
  };

  return (
    <a
      href={`/${target}`}
      hrefLang={target}
      onClick={navigate}
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
