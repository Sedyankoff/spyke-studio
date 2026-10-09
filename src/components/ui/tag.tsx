import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
  tone = "ink",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wide whitespace-nowrap",
        tone === "ink"
          ? "border-line text-ink-soft"
          : "border-line-invert text-paper/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
