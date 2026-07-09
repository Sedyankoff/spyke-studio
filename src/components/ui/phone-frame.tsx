import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/types";

interface PhoneFrameProps {
  image: ProjectImage;
  sizes: string;
  className?: string;
}

export function PhoneFrame({ image, sizes, className }: PhoneFrameProps) {
  return (
    <figure
      className={cn(
        "rounded-[18%_/_8.5%] border border-white/15 bg-black p-[3.5%] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[14%_/_6.8%]">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          className="w-full"
        />
        <span
          aria-hidden="true"
          className="absolute top-[2.5%] left-1/2 h-[2.6%] w-[34%] -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </figure>
  );
}
