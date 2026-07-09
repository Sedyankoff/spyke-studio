import type { EducationItem } from "@/types";

export const educationItems: EducationItem[] = [
  {
    period: "2021 — 2025",
    title: "B.Sc. Software Engineering",
    institution: "Plovdiv University “Paisii Hilendarski”",
    summary:
      "Foundations done properly — algorithms and data structures, databases, operating systems and software architecture — applied immediately to real projects instead of staying in lecture notes.",
    focus: ["Algorithms", "Databases", "Software Architecture"],
  },
  {
    period: "Ongoing",
    title: "Production as a classroom",
    institution: "Self-directed",
    summary:
      "Specifications, RFCs, post-mortems and source code over tutorials. Every shipped system is a course with real grades: uptime, performance and user feedback.",
    focus: ["Distributed Systems", "Design Engineering", "Platform Thinking"],
  },
];
