import type { BrandIconId } from "@/components/ui/brand-icons";

export type SectionId =
  | "hero"
  | "about"
  | "stack"
  | "work"
  | "experience"
  | "education"
  | "contact";

export type NavSectionId = Exclude<SectionId, "hero">;

export type SocialPlatform = "github" | "linkedin" | "portfolio" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** `null` until the real address is known — such links are not rendered. */
  href: string | null;
}

export type ProjectId =
  | "spyke-commerce"
  | "gnc-bulgaria"
  | "bookapart"
  | "spyke-arbix";

export interface ProjectImage {
  id: string;
  src: string;
  width: number;
  height: number;
  kind: "desktop" | "mobile";
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
  period?: Period;
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
  images: ProjectImage[];
}

export interface ProjectCopy {
  name: string;
  category: string;
  status: string;
  summary: string;
  description: string;
  roles: string[];
  images: Record<string, { label: string; alt: string }>;
}

export type StackGroupId =
  | "languages"
  | "frontend"
  | "backend"
  | "data"
  | "cloud"
  | "delivery"
  | "realtime"
  | "observability";

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
  | "rest"
  | "auth"
  | "rbac"
  | "multitenancy"
  | "integrations"
  | "realtime"
  | "cicd";

export interface ExperienceEntry {
  id: string;
  period: Period;
}

export interface EducationEntry {
  id: string;
  period: Period;
  expectedGraduation?: string;
}
