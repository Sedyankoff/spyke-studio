export const locales = ["bg", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bg";

export const localeNames: Record<Locale, string> = {
  bg: "БГ",
  en: "EN",
};

export const htmlLang: Record<Locale, string> = {
  bg: "bg-BG",
  en: "en",
};

export const openGraphLocale: Record<Locale, string> = {
  bg: "bg_BG",
  en: "en_US",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "bg" ? "en" : "bg";
}
