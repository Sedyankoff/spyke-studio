import { cn } from "@/lib/utils";

interface SectionIntroProps {
  titleId: string;
  /** Two-digit section index, matching the navigation. */
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "ink" | "paper";
  className?: string;
}

export function SectionIntro({
  titleId,
  index,
  eyebrow,
  title,
  lead,
  tone = "ink",
  className,
}: SectionIntroProps) {
  const isInk = tone === "ink";

  return (
    <div className={className}>
      <div
        data-reveal="line"
        className={cn("h-px w-full", isInk ? "bg-line" : "bg-line-invert")}
      />

      <div className="mt-5 flex items-center gap-3.5">
        {index && (
          <span className={cn("meta", isInk ? "text-red-deep" : "text-red-light")}>
            {index}
          </span>
        )}
        <span
          aria-hidden="true"
          className={cn("h-2.5 w-px", isInk ? "bg-line" : "bg-line-invert")}
        />
        <span
          className={cn("meta", isInk ? "text-ink-mute" : "text-paper/40")}
        >
          {eyebrow}
        </span>
      </div>

      <h2
        id={titleId}
        data-reveal="up"
        data-rd="1"
        className={cn(
          "display-section mt-5 max-w-3xl",
          isInk ? "text-ink" : "text-paper",
        )}
      >
        {title}
      </h2>

      {lead && (
        <p
          data-reveal="up"
          data-rd="2"
          className={cn(
            "body-lg mt-5 max-w-2xl",
            isInk ? "text-ink-soft" : "text-paper/60",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
