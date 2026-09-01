import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/content/schema";

interface BrowserFrameProps {
  image: ProjectImage;
  alt?: string;
  /** Address-bar text: a real domain when there is one, otherwise the view. */
  label?: string;
  sizes: string;
  className?: string;
  eager?: boolean;
}

/**
 * Product screenshots are always shown inside a frame — a flat rectangle reads
 * as a portfolio thumbnail, a framed one reads as software.
 */
export function BrowserFrame({
  image,
  alt,
  label,
  sizes,
  className,
  eager = false,
}: BrowserFrameProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-line-invert bg-[#141210] shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)]",
        className,
      )}
    >
      <div className="grid h-9 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-line-invert-soft bg-paper/[0.03] px-3.5 sm:h-10 sm:px-4">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-paper/15" />
          <span className="h-2 w-2 rounded-full bg-paper/15" />
          <span className="h-2 w-2 rounded-full bg-paper/15" />
        </span>
        {label && (
          <span className="truncate rounded-md bg-paper/[0.05] px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-paper/45">
            {label}
          </span>
        )}
        <span
          aria-hidden="true"
          className="justify-self-end text-[10px] text-paper/25"
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-red/0 transition-colors duration-500 group-hover:bg-red" />
        </span>
      </div>

      <Image
        src={image.src}
        alt={alt ?? ""}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="block w-full"
      />
    </figure>
  );
}

interface PhoneFrameProps {
  image: ProjectImage;
  alt?: string;
  sizes: string;
  className?: string;
}

export function PhoneFrame({ image, alt, sizes, className }: PhoneFrameProps) {
  return (
    <figure
      className={cn(
        "rounded-[15%_/_7.4%] border border-paper/20 bg-[#0a0908] p-[3%] shadow-[0_30px_70px_-20px_rgb(0_0_0/0.95)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[12.5%_/_6.2%]">
        <Image
          src={image.src}
          alt={alt ?? ""}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading="lazy"
          className="block w-full"
        />
        <span
          aria-hidden="true"
          className="absolute top-[1.8%] left-1/2 h-[2.2%] w-[30%] -translate-x-1/2 rounded-full bg-[#0a0908]"
        />
      </div>
    </figure>
  );
}
