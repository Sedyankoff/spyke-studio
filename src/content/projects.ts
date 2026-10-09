import type { ImageAsset, Project } from "@/content/schema";

const shot = (src: string, width: number, height: number): ImageAsset => ({
  src: `/images/projects/${src}`,
  width,
  height,
});

/**
 * Each screen pairs the desktop and mobile capture of the same page, so the
 * monitor and the phone always show the same project and the same page.
 */
export const projects: Project[] = [
  {
    id: "spyke-commerce",
    glyph: "SC",
    tech: [
      "ASP.NET Core",
      "Entity Framework Core",
      "SQL Server",
      "Next.js",
      "TypeScript",
      "Azure",
    ],
    screens: [
      {
        id: "products",
        desktop: shot(
          "spyke-commerce/spyke-commerce-products-page-desktop.webp",
          1919,
          919,
        ),
        mobile: shot(
          "spyke-commerce/spyke-commerce-products-page-mobile.webp",
          576,
          1257,
        ),
      },
      {
        id: "product-edit",
        desktop: shot(
          "spyke-commerce/spyke-commerce-product-edit-desktop.webp",
          1919,
          921,
        ),
        mobile: shot(
          "spyke-commerce/spyke-commerce-product-edit-mobile.webp",
          442,
          854,
        ),
      },
      {
        id: "login",
        desktop: shot(
          "spyke-commerce/spyke-commerce-login-page-desktop.webp",
          2559,
          1392,
        ),
        mobile: shot(
          "spyke-commerce/spyke-commerce-login-page-mobile.webp",
          444,
          852,
        ),
      },
    ],
  },
  {
    id: "gnc-bulgaria",
    glyph: "GNC",
    url: "https://www.gnc.bg",
    urlLabel: "gnc.bg",
    embedUrl: "https://www.gnc.bg",
    tech: ["Next.js", "TypeScript", "ASP.NET Core", "SQL Server", "Cloudflare"],
    screens: [
      {
        id: "home",
        desktop: shot("gnc/gnc-home-page-desktop.webp", 1919, 919),
        mobile: shot("gnc/gnc-home-page-mobile.webp", 438, 850),
      },
      {
        id: "category",
        desktop: shot("gnc/gnc-category-page-desktop.webp", 1919, 918),
        mobile: shot("gnc/gnc-category-page-mobile.webp", 437, 849),
      },
      {
        id: "product",
        desktop: shot("gnc/gnc-product-preview-page-desktop.webp", 1919, 919),
        mobile: shot("gnc/gnc-product-preview-page-mobile.webp", 440, 847),
      },
    ],
  },
  {
    id: "bookapart",
    glyph: "BA",
    url: "https://www.bookapart.net",
    urlLabel: "bookapart.net",
    embedUrl: "https://www.bookapart.net",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Leaflet", "Azure"],
    screens: [
      {
        id: "home",
        desktop: shot("bookapart/bookapart-home-page-desktop.webp", 2544, 1397),
        mobile: shot("bookapart/bookapart-home-page-mobile.webp", 577, 1255),
      },
      {
        id: "places",
        desktop: shot(
          "bookapart/bookapart-places-page-desktop.webp",
          2559,
          1392,
        ),
        mobile: shot(
          "bookapart/bookapart-places-preview-page-mobile.webp",
          439,
          852,
        ),
      },
      {
        id: "place",
        desktop: shot(
          "bookapart/bookapart-place-preview-page-desktop.webp",
          1919,
          920,
        ),
        mobile: shot(
          "bookapart/bookapart-place-preview-page-mobile.webp",
          439,
          852,
        ),
      },
      {
        id: "landmarks",
        desktop: shot(
          "bookapart/bookapart-landmarks-page-desktop.webp",
          2559,
          1397,
        ),
        mobile: shot(
          "bookapart/bookapart-landmarks-page-mobile.webp",
          440,
          852,
        ),
      },
    ],
  },
];
