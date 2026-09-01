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
  "education",
  "contact",
];

export function formatPeriod(period: Period, present: string): string {
  if (period.ongoing) return `${period.from} — ${present}`;
  if (period.to && period.to !== period.from) {
    return `${period.from} — ${period.to}`;
  }
  return period.from;
}
