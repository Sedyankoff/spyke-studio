import Image from "next/image";
import { brandAssets } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The Spyke Studio brand assets. Both files are the original logo artwork —
 * `logo-ink` / `logo-paper` are the same lockup with the background knocked
 * out for light and dark surfaces, `logo-mark` is the arrow cropped from it.
 * Never substitute type for the mark.
 */

interface SpykeLogoProps {
  /** Surface the logo sits on. `ink` = dark lockup on paper. */
  tone?: "ink" | "paper";
  /** Rendered width hint for the image srcset. */
  sizes?: string;
  className?: string;
  eager?: boolean;
}

export function SpykeLogo({
  tone = "ink",
  sizes = "160px",
  className,
  eager = false,
}: SpykeLogoProps) {
  const asset = tone === "ink" ? brandAssets.logoInk : brandAssets.logoPaper;

  return (
    <Image
      src={asset.src}
      alt=""
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={cn("h-full w-auto select-none", className)}
    />
  );
}

/** The arrow from the logo, used on its own as a compact brand marker. */
export function SpykeMark({
  className,
  sizes = "24px",
}: {
  className?: string;
  sizes?: string;
}) {
  const asset = brandAssets.mark;

  return (
    <Image
      src={asset.src}
      alt=""
      aria-hidden="true"
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      className={cn("h-full w-auto select-none", className)}
    />
  );
}
