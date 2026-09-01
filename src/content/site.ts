import type { SocialLink } from "@/content/schema";

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
}

export const siteConfig = {
  name: "Spyke Studio",
  url: "https://spyke.studio",
  email: "stoil0878@gmail.com",
  timeZone: "Europe/Sofia",
  /** Plovdiv, Bulgaria — printed as hero metadata. */
  coordinates: "42.1354° N, 24.7453° E",
  founded: "2024",
  person: {
    givenName: "Stoil",
    familyName: "Sedyankov",
  },
  heroImage: {
    src: "/images/hero.webp",
    width: 1080,
    height: 1440,
  },
} as const;

/**
 * Brand artwork. `logo.png` is the original supplied file (white lockup on a
 * solid black plate); the three files below are that same artwork with the
 * plate removed so the mark can sit on either surface.
 */
export const brandAssets = {
  logoInk: { src: "/images/logo-ink.png", width: 1485, height: 509 },
  logoPaper: { src: "/images/logo-paper.png", width: 1485, height: 509 },
  mark: { src: "/images/logo-mark.png", width: 200, height: 278 },
} satisfies Record<string, ImageAsset>;

export const portrait: ImageAsset | null = null;

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/stoilsedyankov",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stoilsedyankov",
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/spyke.studio",
  },
  {
    platform: "email",
    label: "Email",
    href: `mailto:${siteConfig.email}`,
  },
];
