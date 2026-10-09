import type { BrandIconId } from "@/components/ui/brand-icons";

export type SectionId = "hero" | "about" | "stack" | "work" | "experience";

export type NavSectionId = Exclude<SectionId, "hero">;

export type SocialPlatform = "github" | "linkedin" | "portfolio" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** `null` until the real address is known — such links are not rendered. */
  href: string | null;
}

export type ProjectId = "spyke-commerce" | "gnc-bulgaria" | "bookapart";

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
}

/**
 * One page of a project, captured at desktop and at mobile width. The two
 * always travel together: the monitor shows `desktop`, the phone `mobile`.
 */
export interface ProjectScreen {
  id: string;
  desktop: ImageAsset;
  mobile: ImageAsset;
}

/** `from` / `to` are `YYYY` or `YYYY-MM`. */
export interface Period {
  from: string;
  to?: string;
  ongoing?: boolean;
}

export interface Project {
  id: ProjectId;
  /** Monogram drawn on the project's desktop icon. */
  glyph: string;
  /** The running product, opened in a new tab. */
  url?: string;
  urlLabel?: string;
  /**
   * Address for the live, interactive preview inside the workstation. Only
   * set it for a site that may be framed. The build still checks the site's
   * response headers (`X-Frame-Options`, CSP `frame-ancestors`) and quietly
   * falls back to the screenshots if framing is refused.
   */
  embedUrl?: string;
  tech: string[];
  screens: ProjectScreen[];
}

export interface ProjectCopy {
  name: string;
  /** One or two plain sentences: what the product is and who it is for. */
  description: string;
  screens: Record<string, { label: string; alt: string }>;
}

export type StackGroupId =
  | "languages"
  | "frontend"
  | "backend"
  | "data"
  | "cloud"
  | "delivery"
  | "realtime";

export interface StackTechnology {
  id: string;
  name: string;
  /** Brand mark; technologies without one get a neutral line icon. */
  icon?: BrandIconId;
  note?: string;
  /** Part of the primary stack: C#/.NET and React/TypeScript. */
  primary?: boolean;
}

export interface StackGroup {
  id: StackGroupId;
  technologies: StackTechnology[];
}

export type CapabilityId =
  "rest" | "multitenancy" | "integrations" | "realtime" | "cicd";

export interface ExperienceEntry {
  id: string;
  period: Period;
}
