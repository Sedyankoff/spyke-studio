import type { SocialLink } from "@/types";

export const siteConfig = {
  name: "Spyke Studio",
  url: "https://spyke.studio",
  description:
    "Spyke Studio is the independent software studio of Stoil Sedyankov — engineering commerce platforms, booking products and digital experiences where architecture, performance and design are one discipline.",
  keywords: [
    "Spyke Studio",
    "Stoil Sedyankov",
    "software engineer",
    "independent software studio",
    "Next.js developer",
    "TypeScript",
    "e-commerce platform",
    "Bulgaria",
  ],
  author: {
    name: "Stoil Sedyankov",
    firstName: "Stoil",
    role: "Software Engineer",
    title: "Software Engineer & Founder of Spyke Studio",
    email: "stoil0878@gmail.com",
    location: "Bulgaria",
    timeZone: "Europe/Sofia",
    availability: "Open to select projects",
  },
} as const;

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/stoilsedyankov",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stoilsedyankov",
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/spyke.studio",
  },
  {
    platform: "email",
    label: "Email",
    href: `mailto:${siteConfig.author.email}`,
  },
];
