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
  /** Display form and dialable form of the same number. */
  phone: { display: "+359 878 245 747", href: "tel:+359878245747" },
  timeZone: "Europe/Sofia",
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
     * the lower half); adjust it when the production photograph lands.
     */
    focus: "48% 76%",
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
