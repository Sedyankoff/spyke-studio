import type { CapabilityId, StackGroup } from "@/content/schema";

/** Order within each group puts the primary stack first. */
export const stackGroups: StackGroup[] = [
  {
    id: "languages",
    technologies: [
      { id: "csharp", name: "C#", icon: "csharp", primary: true },
      { id: "typescript", name: "TypeScript", icon: "typescript", primary: true },
      { id: "javascript", name: "JavaScript", icon: "javascript" },
      { id: "go", name: "Go", icon: "go" },
      { id: "python", name: "Python", icon: "python" },
      { id: "sql", name: "SQL", icon: "sql" },
    ],
  },
  {
    id: "frontend",
    technologies: [
      { id: "react", name: "React", icon: "react", primary: true },
      { id: "nextjs", name: "Next.js", icon: "nextjs" },
      { id: "tailwind", name: "Tailwind CSS", icon: "tailwind" },
      { id: "html", name: "HTML", icon: "html" },
      { id: "css", name: "CSS", icon: "css" },
    ],
  },
  {
    id: "backend",
    technologies: [
      { id: "dotnet", name: ".NET", icon: "dotnet", primary: true },
      { id: "aspnetcore", name: "ASP.NET Core", icon: "dotnet", primary: true },
      { id: "nodejs", name: "Node.js", icon: "nodejs" },
    ],
  },
  {
    id: "data",
    technologies: [
      { id: "sqlserver", name: "SQL Server", icon: "sqlserver" },
      { id: "postgresql", name: "PostgreSQL", icon: "postgresql" },
      { id: "redis", name: "Redis", icon: "redis" },
      { id: "clickhouse", name: "ClickHouse", icon: "clickhouse" },
    ],
  },
  {
    id: "cloud",
    technologies: [
      { id: "azure", name: "Microsoft Azure", icon: "azure" },
      { id: "docker", name: "Docker", icon: "docker" },
      { id: "cloudflare", name: "Cloudflare", icon: "cloudflare" },
      { id: "linux", name: "Linux", icon: "linux" },
      { id: "terraform", name: "Terraform", icon: "terraform" },
    ],
  },
  {
    id: "delivery",
    technologies: [
      { id: "git", name: "Git", icon: "git" },
      { id: "github", name: "GitHub", icon: "github" },
      { id: "githubactions", name: "GitHub Actions", icon: "githubactions" },
    ],
  },
  {
    id: "realtime",
    technologies: [
      { id: "websockets", name: "WebSockets" },
      { id: "nats", name: "NATS / JetStream", icon: "nats" },
    ],
  },
  {
    id: "observability",
    technologies: [
      { id: "opentelemetry", name: "OpenTelemetry", icon: "opentelemetry" },
      { id: "grafana", name: "Grafana", icon: "grafana" },
    ],
  },
];

export const capabilityIds: CapabilityId[] = [
  "rest",
  "auth",
  "rbac",
  "multitenancy",
  "integrations",
  "realtime",
  "cicd",
];
