import type { Metadata } from "next";
import { SpykeLogo } from "@/components/brand/spyke-logo";
import { getDictionary } from "@/content";
import { siteConfig } from "@/content/site";
import { defaultLocale, htmlLang, locales } from "@/i18n/config";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `404 — ${siteConfig.name}`,
  robots: { index: false },
};

/**
 * Every URL outside a locale. The visitor's language is unknown here, so the
 * page speaks both and offers a way into each.
 */
export default function GlobalNotFound() {
  return (
    <html lang={htmlLang[defaultLocale]} className={fontVariables}>
      <body className="flex min-h-svh flex-col items-center justify-center gap-8 bg-void px-6 text-center text-paper">
        <a
          href={`/${defaultLocale}`}
          aria-label={siteConfig.name}
          className="block h-10"
        >
          <SpykeLogo tone="paper" eager sizes="120px" />
        </a>
        <p className="display-section text-red">404</p>

        <ul className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          {locales.map((locale) => {
            const { common } = getDictionary(locale);

            return (
              <li key={locale} lang={htmlLang[locale]}>
                <p className="text-[15px] text-paper/70">{common.notFound}</p>
                <a
                  href={`/${locale}`}
                  className="mt-4 inline-flex h-11 items-center rounded-full border border-line-invert px-6 text-sm font-medium transition-colors duration-200 hover:border-paper hover:bg-paper hover:text-ink"
                >
                  {common.home}
                </a>
              </li>
            );
          })}
        </ul>
      </body>
    </html>
  );
}
