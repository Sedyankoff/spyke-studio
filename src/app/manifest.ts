import type { MetadataRoute } from "next";
import { getDictionary } from "@/content";
import { siteConfig } from "@/content/site";
import { defaultLocale } from "@/i18n/config";

export default function manifest(): MetadataRoute.Manifest {
  const dictionary = getDictionary(defaultLocale);

  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: dictionary.meta.description,
    lang: defaultLocale,
    start_url: `/${defaultLocale}`,
    display: "standalone",
    background_color: "#f5f2ec",
    theme_color: "#f5f2ec",
    icons: [
      { src: "/images/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
