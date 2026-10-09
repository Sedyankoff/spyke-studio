import type { ImageAsset, SocialLink } from "@/content/schema";

export const siteConfig = {
  name: "Spyke Studio",
  /** Production origin. Canonical URLs, the sitemap and social cards derive from it. */
  url: "https://spykedev.com",
  email: "stoil0878@gmail.com",
  /** Display form and dialable form of the same number. */
  phone: { display: "+359 878 245 747", href: "tel:+359878245747" },
  person: {
    givenName: "Stoil",
    familyName: "Sedyankov",
  },
  heroImage: {
    src: "/images/hero.webp",
    width: 1080,
    height: 1440,
    /**
     * `object-position` for the full-bleed crop: which part of the photograph
     * stays in frame. Tuned for this image (horizon, landscape and figure in
     * the lower half).
     */
    focus: "48% 76%",
  },
} as const;

/**
 * Brand artwork. `logo.png` is the original supplied lockup (white on a solid
 * black plate); `logo-ink` / `logo-paper` are that artwork with the plate
 * removed, for paper and ink surfaces. `icon` is the Spyke Studio app icon —
 * the S and arrow on a black disc — used as the compact mark and, resized, for
 * the favicon, Apple touch icon and manifest icons.
 */
export const brandAssets = {
  logoInk: { src: "/images/logo-ink.png", width: 1485, height: 509 },
  logoPaper: { src: "/images/logo-paper.png", width: 1485, height: 509 },
  icon: {
    src: "/images/icons/spyke-studio-icon.png",
    width: 1254,
    height: 1254,
  },
} satisfies Record<string, ImageAsset>;

/**
 * The About portrait: a cut-out on a transparent ground, so the section's own
 * black shows through around it.
 */
export const portrait = {
  src: "/images/StoilSedyankov.png",
  width: 2028,
  height: 2120,
} satisfies ImageAsset;

/**
 * Professional profiles. An `href` of `null` is a placeholder: the link is
 * not rendered anywhere until a real address is filled in here.
 */
export const socialLinks: SocialLink[] = [
  { platform: "linkedin", label: "LinkedIn", href: null },
  { platform: "github", label: "GitHub", href: null },
  { platform: "portfolio", label: "Portfolio", href: null },
  {
    platform: "email",
    label: "Email",
    href: `mailto:${siteConfig.email}`,
  },
];
