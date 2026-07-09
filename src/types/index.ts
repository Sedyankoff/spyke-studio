export type SectionId =
  | "home"
  | "about"
  | "philosophy"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "contact";

export type SocialPlatform = "github" | "linkedin" | "instagram" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: `#${SectionId}`;
  sectionIds: SectionId[];
}

export interface JourneyStep {
  period: string;
  title: string;
  description: string;
}

export interface Principle {
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  core?: boolean;
}

export interface SkillGroup {
  category: string;
  focus: string;
  skills: Skill[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectTheme {
  /** Primary ambient glow, as a CSS color with alpha. */
  primary: string;
  /** Secondary ambient glow, as a CSS color with alpha. */
  secondary: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  year: string;
  status: string;
  role: string;
  description: string;
  challenge: string;
  solution: string;
  highlights: string[];
  stack: string[];
  links?: {
    live?: string;
  };
  images: {
    desktop: ProjectImage;
    phone: ProjectImage;
  };
  theme: ProjectTheme;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  summary: string;
  tags: string[];
}

export interface EducationItem {
  period: string;
  title: string;
  institution: string;
  summary: string;
  focus: string[];
}
