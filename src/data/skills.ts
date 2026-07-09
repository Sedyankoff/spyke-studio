import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    focus: "Interfaces that feel engineered",
    skills: [
      { name: "TypeScript", core: true },
      { name: "React", core: true },
      { name: "Next.js", core: true },
      { name: "Tailwind CSS", core: true },
      { name: "Framer Motion" },
      { name: "Accessibility" },
      { name: "Technical SEO" },
    ],
  },
  {
    category: "Backend",
    focus: "APIs built for real workloads",
    skills: [
      { name: "Node.js", core: true },
      { name: "REST & Webhooks", core: true },
      { name: "Authentication & RBAC" },
      { name: "Payments & Checkout" },
      { name: "Background Jobs" },
      { name: "Caching Strategies" },
    ],
  },
  {
    category: "Databases",
    focus: "Data models that scale with the product",
    skills: [
      { name: "PostgreSQL", core: true },
      { name: "Prisma ORM", core: true },
      { name: "Redis" },
      { name: "Query Optimisation" },
      { name: "Data Modelling" },
    ],
  },
  {
    category: "Cloud & DevOps",
    focus: "Shipping without ceremony",
    skills: [
      { name: "Vercel", core: true },
      { name: "Docker" },
      { name: "GitHub Actions" },
      { name: "CI/CD Pipelines" },
      { name: "Monitoring & Alerting" },
    ],
  },
  {
    category: "Architecture",
    focus: "Systems designed to be maintained",
    skills: [
      { name: "Multi-tenant Platforms", core: true },
      { name: "Design Systems", core: true },
      { name: "Internationalisation" },
      { name: "Analytics Pipelines" },
      { name: "API Design" },
      { name: "Domain Modelling" },
    ],
  },
  {
    category: "Tools",
    focus: "A deliberate, minimal toolkit",
    skills: [
      { name: "Git & GitHub", core: true },
      { name: "Figma" },
      { name: "Linear" },
      { name: "Postman" },
      { name: "AI-assisted Engineering" },
    ],
  },
];
