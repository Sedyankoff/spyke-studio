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

export type SocialPlatform = "github" | "linkedin" | "instagram" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
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

export interface Period {
  from: string;
  to?: string;
  ongoing?: boolean;
}

export interface Project {
  id: ProjectId;
  period?: Period;
  url?: string;
  urlLabel?: string;
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
  | "cloud";

export interface StackTechnology {
  id: string;
  name: string;
  icon: BrandIconId;
  note?: string;
}

export interface StackGroup {
  id: StackGroupId;
  technologies: StackTechnology[];
}

export type CapabilityId =
  | "rest"
  | "websockets"
  | "auth"
  | "multitenancy"
  | "realtime"
  | "integrations"
  | "cicd";

export interface ExperienceEntry {
  id: string;
  period: Period;
}

export interface EducationEntry {
  id: string;
  period: Period;
}
