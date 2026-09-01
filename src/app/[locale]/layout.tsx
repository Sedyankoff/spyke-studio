import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono, Oswald } from "next/font/google";
import { CommandPanel } from "@/components/command/command-panel";
import { CommandProvider } from "@/components/command/command-context";
import { PageShell } from "@/components/command/page-shell";
import { SiteHeader } from "@/components/command/site-header";
import { MotionProvider } from "@/components/providers/motion-provider";
import { RevealObserver } from "@/components/providers/reveal-observer";
import { getDictionary } from "@/content";
import { buildNavPreview } from "@/content/nav-preview";
import { siteConfig } from "@/content/site";
import {
  htmlLang,
  isLocale,
  locales,
  openGraphLocale,
  type Locale,
} from "@/i18n/config";
import { buildStructuredData } from "@/lib/structured-data";
import "../globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};

  const dictionary = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    applicationName: siteConfig.name,
    authors: [
      {
        name: `${siteConfig.person.givenName} ${siteConfig.person.familyName}`,
        url: siteConfig.url,
      },
    ],
    creator: `${siteConfig.person.givenName} ${siteConfig.person.familyName}`,
    keywords: dictionary.meta.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        bg: "/bg",
        en: "/en",
        "x-default": "/bg",
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: siteConfig.name,
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      locale: openGraphLocale[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: "technology",
  };
}

export const viewport: Viewport = {
  themeColor: "#f5f2ec",
  colorScheme: "light",
};

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale as Locale);
  const navPreview = buildNavPreview(dictionary, siteConfig.email);

  return (
    <html
      lang={htmlLang[locale as Locale]}
      className={`${oswald.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-svh bg-paper">
        <a href="#content" className="skip-link">
          {dictionary.common.skipToContent}
        </a>

        <MotionProvider>
          <CommandProvider>
            <div id="site-header">
              <SiteHeader
                locale={locale as Locale}
                nav={dictionary.nav}
                common={dictionary.common}
              />
            </div>
            <CommandPanel
              locale={locale as Locale}
              nav={dictionary.nav}
              common={dictionary.common}
              preview={navPreview}
            />
            <div id="site-shell">
              <PageShell>{props.children}</PageShell>
            </div>
          </CommandProvider>
        </MotionProvider>

        <RevealObserver />


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildStructuredData(locale as Locale, dictionary),
            ),
          }}
        />
      </body>
    </html>
  );
}
