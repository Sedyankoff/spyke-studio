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
    background_color: "#0b0a09",
    theme_color: "#0b0a09",
    icons: [
      {
        src: "/images/icons/spyke-studio-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icons/spyke-studio-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
