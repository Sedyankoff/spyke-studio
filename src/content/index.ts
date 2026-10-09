import type { Dictionary } from "@/content/dictionary";
import { bg } from "@/content/locales/bg";
import { en } from "@/content/locales/en";
import type { Locale } from "@/i18n/config";
import type { NavSectionId, Period } from "@/content/schema";

const dictionaries: Record<Locale, Dictionary> = { bg, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const navSectionIds: NavSectionId[] = [
  "about",
  "stack",
  "work",
  "experience",
];

/** `2024` stays `2024`; `2024-05` becomes e.g. `May 2024` with the given month names. */
export function formatDate(value: string, months?: string[]): string {
  const [year, month] = value.split("-");
  return month && months ? `${months[Number(month) - 1]} ${year}` : year;
}

export function formatPeriod(
  period: Period,
  present: string,
  months?: string[],
): string {
  const from = formatDate(period.from, months);
  if (period.ongoing) return `${from} — ${present}`;
  if (period.to && period.to !== period.from) {
    return `${from} — ${formatDate(period.to, months)}`;
  }
  return from;
}
