import { BrowserFrame, PhoneFrame } from "@/components/work/device-frame";
import { SystemDiagram } from "@/components/work/system-diagram";
import type { Dictionary } from "@/content/dictionary";
import type { Project, ProjectCopy } from "@/content/schema";
import { cn } from "@/lib/utils";

interface ProjectVisualProps {
  project: Project;
  copy: ProjectCopy;
  work: Dictionary["work"];
  eager?: boolean;
  className?: string;
}

/**
 * A product, not a screenshot: the primary view sits in a browser frame, a
 * second view is layered behind it and the mobile view overlaps the corner.
 */
export function ProjectVisual({
  project,
  copy,
  work,
  eager = false,
  className,
}: ProjectVisualProps) {
  const desktop = project.images.filter((image) => image.kind === "desktop");
  const phone = project.images.find((image) => image.kind === "mobile");
  const primary = desktop[0];
  const behind = desktop[1];

  if (!primary) {
    return (
      <SystemDiagram
        label={work.dataPathLabel}
        steps={work.dataPath}
        className={cn("min-h-[18rem] sm:min-h-[22rem]", className)}
      />
    );
  }

  const address = project.urlLabel ?? copy.images[primary.id]?.label;

  return (
    <div className={cn("relative isolate", className)}>
      {behind && (
        <div
          aria-hidden="true"
          className="absolute -top-7 -right-[4%] z-0 hidden w-[86%] opacity-30 transition-transform duration-700 ease-[var(--ease-spatial)] group-hover:-translate-y-2 lg:block"
        >
          <BrowserFrame
            image={behind}
            label={copy.images[behind.id]?.label}
            sizes="40vw"
          />
        </div>
      )}

      <div className="relative z-10 overflow-hidden rounded-xl">
        <BrowserFrame
          image={primary}
          alt={copy.images[primary.id]?.alt}
          label={address}
          sizes="(min-width: 1280px) 62vw, (min-width: 1024px) 68vw, 92vw"
          eager={eager}
          className="transition-transform duration-700 ease-[var(--ease-spatial)] group-hover:scale-[1.012]"
        />
      </div>

      {phone && (
        <div className="absolute -bottom-8 right-3 z-20 w-[24%] max-w-[8.5rem] transition-transform duration-700 ease-[var(--ease-spatial)] group-hover:-translate-y-2.5 sm:-bottom-10 sm:right-8 lg:w-[16%] lg:max-w-[11rem]">
          <PhoneFrame
            image={phone}
            sizes="(min-width: 1024px) 11rem, 8.5rem"
          />
        </div>
      )}
    </div>
  );
}
