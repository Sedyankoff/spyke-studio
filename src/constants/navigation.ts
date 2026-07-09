import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "About", href: "#about", sectionIds: ["about"] },
  { label: "Philosophy", href: "#philosophy", sectionIds: ["philosophy"] },
  { label: "Skills", href: "#skills", sectionIds: ["skills"] },
  { label: "Work", href: "#projects", sectionIds: ["projects"] },
  {
    label: "Experience",
    href: "#experience",
    sectionIds: ["experience", "education"],
  },
];

export const contactNavItem: NavItem = {
  label: "Contact",
  href: "#contact",
  sectionIds: ["contact"],
};
