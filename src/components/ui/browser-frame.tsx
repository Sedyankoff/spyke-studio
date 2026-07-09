import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/types";

interface BrowserFrameProps {
  image: ProjectImage;
  domain: string;
  sizes: string;
  className?: string;
}

export function BrowserFrame({
  image,
  domain,
  sizes,
  className,
}: BrowserFrameProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-raised shadow-[0_32px_96px_-32px_rgba(0,0,0,0.85)]",
        className,
      )}
    >
      <div className="grid h-9 grid-cols-[1fr_auto_1fr] items-center border-b border-white/[0.06] bg-white/[0.02] px-4">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.14]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.14]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.14]" />
        </span>
        <span className="rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[10px] tracking-wide text-muted">
          {domain}
        </span>
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="w-full"
      />
    </figure>
  );
}
