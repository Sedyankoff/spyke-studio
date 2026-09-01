import type { EducationEntry, ExperienceEntry } from "@/content/schema";

export const experienceEntries: ExperienceEntry[] = [
  { id: "spyke-studio", period: { from: "2024", ongoing: true } },
  { id: "gnc", period: { from: "2025" } },
  { id: "freelance", period: { from: "2022", to: "2024" } },
];

export const educationEntries: EducationEntry[] = [
  { id: "plovdiv", period: { from: "2021", to: "2025" } },
];
