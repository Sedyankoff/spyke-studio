import { cn } from "@/lib/utils";
import type { SectionId } from "@/content/schema";

interface SectionProps {
  id: SectionId;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
  /** Dark sections tell the fixed header to switch to its paper treatment. */
  tone?: "dark";
}

export function Section({
  id,
  className,
  children,
  labelledBy,
  tone,
}: SectionProps) {
  return (
    <section
      id={id}
      data-section={id}
      data-tone={tone}
      aria-labelledby={labelledBy ?? `${id}-title`}
      className={cn("relative scroll-mt-20", className)}
    >
      {children}
    </section>
  );
}
