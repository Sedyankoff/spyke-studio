import Image from "next/image";
import { brandAssets } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The Spyke Studio brand assets. `logo-ink` / `logo-paper` are the original
 * lockup with the background knocked out for light and dark surfaces; the
 * mark is the app icon. Never substitute type for either.
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

/** The app icon — the S and arrow on a black disc — as a compact brand marker. */
export function SpykeMark({
  className,
  sizes = "24px",
}: {
  className?: string;
  sizes?: string;
}) {
  const asset = brandAssets.icon;

  return (
    <Image
      src={asset.src}
      alt=""
      aria-hidden="true"
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      className={cn("h-full w-auto rounded-full select-none", className)}
    />
  );
}
