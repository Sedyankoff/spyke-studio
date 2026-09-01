import type { CapabilityId, StackGroup } from "@/content/schema";

export const stackGroups: StackGroup[] = [
  {
    id: "languages",
    technologies: [
      { id: "typescript", name: "TypeScript", icon: "typescript" },
      { id: "csharp", name: "C#", icon: "csharp" },
      { id: "go", name: "Go", icon: "go" },
      { id: "sql", name: "SQL", icon: "sql" },
    ],
  },
  {
    id: "frontend",
    technologies: [
      { id: "react", name: "React", icon: "react" },
      { id: "nextjs", name: "Next.js", icon: "nextjs" },
      { id: "tailwind", name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    id: "backend",
    technologies: [
      { id: "dotnet", name: ".NET", icon: "dotnet", note: "ASP.NET Core" },
      { id: "nodejs", name: "Node.js", icon: "nodejs" },
    ],
  },
  {
    id: "data",
    technologies: [
      { id: "sqlserver", name: "SQL Server", icon: "sqlserver" },
      { id: "postgresql", name: "PostgreSQL", icon: "postgresql" },
      { id: "redis", name: "Redis", icon: "redis" },
    ],
  },
  {
    id: "cloud",
    technologies: [
      { id: "azure", name: "Azure", icon: "azure" },
      { id: "docker", name: "Docker", icon: "docker" },
      {
        id: "githubactions",
        name: "GitHub Actions",
        icon: "githubactions",
        note: "CI/CD",
      },
      { id: "cloudflare", name: "Cloudflare", icon: "cloudflare" },
    ],
  },
];

export const capabilityIds: CapabilityId[] = [
  "rest",
  "websockets",
  "auth",
  "multitenancy",
  "realtime",
  "integrations",
  "cicd",
];
