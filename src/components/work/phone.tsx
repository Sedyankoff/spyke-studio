"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { SpykeMark } from "@/components/brand/spyke-logo";
import type { ImageAsset } from "@/content/schema";
import { cn } from "@/lib/utils";

interface PhoneProps {
  /** The mobile view to show; nothing selected leaves the phone on standby. */
  image: ImageAsset | null;
  alt: string;
  className?: string;
}

/**
 * A current-generation phone: a thin, flat-sided body, an even hairline
 * bezel and an island cut-out. Every dimension is a percentage of the body,
 * so the device keeps its proportions at any size.
 */
export function Phone({ image, alt, className }: PhoneProps) {
  return (
    <figure
      className={cn(
        "relative aspect-[9/19.5] rounded-[17%/7.8%] bg-gradient-to-b from-[#34302b] via-[#1d1b18] to-[#2a2723] p-[2.4%] shadow-[0_50px_90px_-30px_rgb(0_0_0/0.95),inset_0_0_0_1px_rgb(245_242_236/0.14)]",
        className,
      )}
    >
      {/* Side keys */}
      <span
        aria-hidden="true"
        className="absolute top-[22%] -right-[1.5%] h-[11%] w-[1.6%] rounded-r-sm bg-[#26231f]"
      />
      <span
        aria-hidden="true"
        className="absolute top-[19%] -left-[1.5%] h-[6.5%] w-[1.6%] rounded-l-sm bg-[#26231f]"
      />
      <span
        aria-hidden="true"
        className="absolute top-[27.5%] -left-[1.5%] h-[6.5%] w-[1.6%] rounded-l-sm bg-[#26231f]"
      />

      <div className="relative h-full w-full overflow-hidden rounded-[15%/6.9%] bg-void">
        <AnimatePresence initial={false}>
          {image ? (
            <m.div
              key={image.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              // The status-bar band stays clear so the island never covers the page.
              className="absolute inset-x-0 top-[5.2%] bottom-0 bg-paper"
            >
              <Image
                src={image.src}
                alt={alt}
                fill
                sizes="(min-width: 640px) 16vw, 60vw"
                className="object-cover object-top"
              />
            </m.div>
          ) : (
            <m.div
              key="standby"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(120%_60%_at_50%_0%,#1e1c19,#0b0a09_70%)]"
            >
              <span className="block h-[7%] opacity-40">
                <SpykeMark sizes="32px" />
              </span>
            </m.div>
          )}
        </AnimatePresence>

        {/* Island */}
        <span
          aria-hidden="true"
          className="absolute top-[1.4%] left-1/2 z-10 h-[3%] w-[29%] -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </figure>
  );
}
