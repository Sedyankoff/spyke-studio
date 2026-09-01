import type { BrandIconId } from "@/components/ui/brand-icons";
import { formatPeriod } from "@/content";
import type { Dictionary } from "@/content/dictionary";
import { educationEntries, experienceEntries } from "@/content/cv";
import { projects } from "@/content/projects";
import { stackGroups } from "@/content/stack";
import type { ProjectImage } from "@/content/schema";

/**
 * The navigation preview needs a handful of facts from across the content
 * layer. Flattening them here keeps the panel — a client component — from
 * having to receive the entire dictionary.
 */
export interface NavPreviewData {
  about: {
    name: string;
    role: string;
    studio: string;
    facts: { label: string; value: string }[];
  };
  stack: {
    technologies: { id: string; name: string; icon: BrandIconId }[];
  };
  work: {
    items: { id: string; name: string; category: string; image?: ProjectImage }[];
  };
  experience: {
    items: { id: string; period: string; role: string; company: string }[];
  };
  education: {
    period: string;
    degree: string;
    institution: string;
    focus: string[];
    languages: { name: string; level?: string }[];
  };
  contact: {
    email: string;
    availability: string;
    lead: string;
  };
}

export function buildNavPreview(
  dictionary: Dictionary,
  email: string,
): NavPreviewData {
  const present = dictionary.common.present;
  const education = educationEntries[0];
  const educationCopy = dictionary.education.entries[education.id];

  return {
    about: {
      name: dictionary.about.name,
      role: dictionary.about.role,
      studio: dictionary.about.studio,
      facts: dictionary.about.facts.slice(0, 4),
    },
    stack: {
      technologies: stackGroups
        .flatMap((group) => group.technologies)
        .map(({ id, name, icon }) => ({ id, name, icon })),
    },
    work: {
      items: projects.map((project) => ({
        id: project.id,
        name: dictionary.work.projects[project.id].name,
        category: dictionary.work.projects[project.id].category,
        image:
          project.images.find((image) => image.kind === "desktop") ??
          project.images[0],
      })),
    },
    experience: {
      items: experienceEntries.map((entry) => ({
        id: entry.id,
        period: formatPeriod(entry.period, present),
        role: dictionary.experience.entries[entry.id].role,
        company: dictionary.experience.entries[entry.id].company,
      })),
    },
    education: {
      period: formatPeriod(education.period, present),
      degree: educationCopy.degree,
      institution: educationCopy.institution,
      focus: educationCopy.focus,
      languages: dictionary.education.languages,
    },
    contact: {
      email,
      availability: dictionary.contact.availability,
      lead: dictionary.contact.lead,
    },
  };
}
