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
    ogAlt: string;
  };
  common: {
    present: string;
    skipToContent: string;
    backToTop: string;
    close: string;
    languageLabel: string;
    switchLanguage: string;
  };
  nav: {
    label: string;
    open: string;
    close: string;
    sectionsLabel: string;
    previewLabel: string;
    items: Record<NavSectionId, { label: string; hint: string }>;
  };
  hero: {
    eyebrow: string;
    role: string;
    statement: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    name: string;
    role: string;
    studio: string;
    paragraphs: string[];
    factsLabel: string;
    facts: { label: string; value: string }[];
    portraitAlt: string;
  };
  stack: {
    eyebrow: string;
    title: string;
    lead: string;
    groups: Record<StackGroupId, string>;
    capabilitiesTitle: string;
    capabilities: Record<CapabilityId, string>;
  };
  work: {
    eyebrow: string;
    title: string;
    lead: string;
    open: string;
    viewCase: string;
    closeProject: string;
    indexLabel: string;
    categoryLabel: string;
    roleLabel: string;
    statusLabel: string;
    techLabel: string;
    overviewLabel: string;
    liveLabel: string;
    galleryLabel: string;
    previousImage: string;
    nextImage: string;
    dataPathLabel: string;
    dataPath: string[];
    projects: Record<ProjectId, ProjectCopy>;
  };
  experience: {
    eyebrow: string;
    title: string;
    professional: string;
    entries: Record<
      string,
      { role: string; company: string; summary: string; tags: string[] }
    >;
  };
  education: {
    eyebrow: string;
    title: string;
    academic: string;
    additional: string;
    entries: Record<
      string,
      {
        degree: string;
        institution: string;
        summary: string;
        focus: string[];
      }
    >;
    languagesLabel: string;
    languages: { name: string; level?: string }[];
    licenceLabel: string;
    licenceValue: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    emailLabel: string;
    copyEmail: string;
    emailCopied: string;
    elsewhereLabel: string;
    availability: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      note: string;
      subject: string;
      opening: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
    builtBy: string;
  };
}
