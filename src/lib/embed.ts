import type { Project, ProjectId } from "@/content/schema";
import { siteConfig } from "@/content/site";

/**
 * Whether a site will render inside an iframe on this one.
 *
 * A browser cannot tell a page that a frame was refused — the frame still
 * "loads", showing the browser's own error page — so the check happens here,
 * on the server, by reading the response headers. Anything uncertain
 * (network failure, timeout, a non-200 answer) counts as "no": the visitor
 * then sees the screenshots, never a broken frame.
 *
 * With `force-cache` the request runs once per build rather than per visit.
 */
async function allowsFraming(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      cache: "force-cache",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return false;

    // DENY and SAMEORIGIN both exclude us; ALLOW-FROM is obsolete.
    if (response.headers.get("x-frame-options")) return false;

    const policy = response.headers.get("content-security-policy");
    const ancestors = policy
      ?.split(";")
      .map((directive) => directive.trim())
      .find((directive) => directive.toLowerCase().startsWith("frame-ancestors"))
      ?.split(/\s+/)
      .slice(1);

    if (!ancestors) return true;
    const ownOrigin = new URL(siteConfig.url).origin;
    return ancestors.some((source) => source === "*" || source === ownOrigin);
  } catch {
    return false;
  }
}

/** The projects whose live preview can actually be shown. */
export async function embeddableProjects(
  projects: Project[],
): Promise<ProjectId[]> {
  const checks = await Promise.all(
    projects.map(async (project) =>
      project.embedUrl && (await allowsFraming(project.embedUrl))
        ? project.id
        : null,
    ),
  );
  return checks.filter((id): id is ProjectId => id !== null);
}
