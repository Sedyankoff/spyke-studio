import type {
  CapabilityId,
  NavSectionId,
  ProjectCopy,
  ProjectId,
  StackGroupId,
} from "@/content/schema";

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  common: {
    present: string;
    skipToContent: string;
    backToTop: string;
    close: string;
    switchLanguage: string;
    /** The 404 page. */
    notFound: string;
    home: string;
    /** Short month names, January first. */
    months: string[];
  };
  nav: {
    label: string;
    open: string;
    close: string;
    sectionsLabel: string;
    items: Record<NavSectionId, { label: string; hint: string }>;
  };
  hero: {
    statement: string;
    /**
     * `statement`, word for word, in its display lines, each split by hand
     * into the two rows it takes beside the sculpture (lg up). Narrower, a
     * line's rows run on as one line and wrap to the measure.
     */
    statementLines: [string, string][];
    lead: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    eyebrow: string;
    name: string;
    role: string;
    paragraphs: string[];
    portraitAlt: string;
  };
  stack: {
    eyebrow: string;
    title: string;
    lead: string;
    groups: Record<StackGroupId, string>;
    /** Marks the primary stack (C#/.NET, React/TypeScript). */
    primaryLabel: string;
    capabilitiesTitle: string;
    capabilities: Record<CapabilityId, string>;
  };
  work: {
    eyebrow: string;
    title: string;
    lead: string;
    open: string;
    workstationLabel: string;
    liveView: string;
    liveLoading: string;
    /** Link that opens the running site in a new tab. */
    visitSite: string;
    /** Appended to the link's accessible name. */
    newTab: string;
    /** Appended to a screen's alt text for its phone capture. */
    mobileView: string;
    previousImage: string;
    nextImage: string;
    techLabel: string;
    projects: Record<ProjectId, ProjectCopy>;
  };
  experience: {
    eyebrow: string;
    title: string;
    areasLabel: string;
    entries: Record<
      string,
      {
        role: string;
        company: string;
        location: string;
        summary: string;
        /** The primary technologies of the role. */
        tags: string[];
        /** Areas of work, listed quietly after the tags. */
        areas?: string[];
      }
    >;
  };
  footer: {
    /** Copyright holder. */
    owner: string;
    tagline: string;
    rights: string;
    builtBy: string;
  };
}
