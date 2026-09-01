import { cn } from "@/lib/utils";
import type { SectionId } from "@/content/schema";

interface SectionProps {
  id: SectionId;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}

export function Section({ id, className, children, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      data-section={id}
      aria-labelledby={labelledBy ?? `${id}-title`}
      className={cn("relative scroll-mt-20", className)}
    >
      {children}
    </section>
  );
}
