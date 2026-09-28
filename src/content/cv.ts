import type { EducationEntry, ExperienceEntry } from "@/content/schema";

/** Dates are `YYYY-MM`; the copy for each entry lives in the dictionaries. */
export const experienceEntries: ExperienceEntry[] = [
  { id: "orak", period: { from: "2024-05", ongoing: true } },
  { id: "skai", period: { from: "2022-06", to: "2022-08" } },
];

export const educationEntries: EducationEntry[] = [
  {
    id: "plovdiv",
    period: { from: "2023-10", ongoing: true },
    expectedGraduation: "2027",
  },
];
