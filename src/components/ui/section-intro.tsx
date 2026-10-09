import { cn } from "@/lib/utils";

interface SectionIntroProps {
  titleId: string;
  /** Short section name, matching the navigation. Omitted when it would only repeat the title. */
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "ink" | "paper";
  className?: string;
}

export function SectionIntro({
  titleId,
  eyebrow,
  title,
  lead,
  tone = "ink",
  className,
}: SectionIntroProps) {
  const isInk = tone === "ink";
  const showEyebrow = eyebrow.toLocaleLowerCase() !== title.toLocaleLowerCase();

  return (
    <div className={className}>
      <div
        data-reveal="line"
        className={cn("h-px w-full", isInk ? "bg-line" : "bg-line-invert")}
      />

      {showEyebrow && (
        <p
          className={cn(
            "meta mt-5 flex items-center gap-3",
            isInk ? "text-ink-mute" : "text-paper/45",
          )}
        >
          <span aria-hidden="true" className="h-px w-6 bg-red" />
          {eyebrow}
        </p>
      )}

      <h2
        id={titleId}
        data-reveal="up"
        data-rd="1"
        className={cn(
          "display-section max-w-3xl",
          showEyebrow ? "mt-5" : "mt-8",
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
