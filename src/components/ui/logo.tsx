import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * Text lockup derived from the Spyke Studio wordmark. Scales with the
 * font size of its container, so pass a text size class to resize it.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex flex-col leading-none text-foreground select-none",
        className,
      )}
    >
      <span className="flex items-start font-sans font-bold tracking-tight">
        Spyke
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="mt-[0.02em] ml-[0.14em] h-[0.52em] w-[0.52em] text-accent"
        >
          <path
            d="M4.5 19.5 18 6M8.5 6H18v9.5"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="mt-[0.32em] font-mono text-[0.34em] font-medium tracking-[0.52em] text-muted uppercase">
        Studio
      </span>
    </span>
  );
}
