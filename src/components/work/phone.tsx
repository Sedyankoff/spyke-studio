"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { SpykeMark } from "@/components/brand/spyke-logo";
import { LiveFrames, type LiveFrame } from "@/components/work/live-frames";
import {
  MOBILE_ASPECT,
  MOBILE_VIEWPORT,
  PHONE_SIZES,
  SCREEN_QUALITY,
} from "@/components/work/screen-sizes";
import type { ImageAsset, ProjectId } from "@/content/schema";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface PhoneProps {
  /** The mobile view to show; nothing selected leaves the phone on standby. */
  image: ImageAsset | null;
  alt: string;
  /**
   * The live site to show over the capture, laid out at a real phone width
   * so it serves its mobile layout. Captures stay underneath as the fallback.
   */
  frame: LiveFrame | null;
  frameTitleOf: (id: ProjectId) => string;
  posterOf: (id: ProjectId) => ImageAsset | undefined;
  onLiveFail: (id: ProjectId) => void;
  className?: string;
}

/**
 * A current-generation phone: a thin, flat-sided body, an even hairline
 * bezel and an island in a status-bar band. The page area below the band has
 * the proportions of the mobile captures (440 × 852), so they fill it edge to
 * edge; the body takes its height from that. Every other dimension is a
 * percentage of the body, so the device keeps its proportions at any size.
 */
export function Phone({
  image,
  alt,
  frame,
  frameTitleOf,
  posterOf,
  onLiveFail,
  className,
}: PhoneProps) {
  return (
    <figure
      className={cn(
        "relative rounded-[17%/8.5%] bg-gradient-to-b from-[#34302b] via-[#1d1b18] to-[#2a2723] p-[2.4%] shadow-[0_50px_90px_-30px_rgb(0_0_0/0.95),inset_0_0_0_1px_rgb(245_242_236/0.14)]",
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

      <div className="relative overflow-hidden rounded-[15.3%/7.5%] bg-void">
        {/* Status bar: the island sits here, so it never covers the page. */}
        <div aria-hidden="true" className="relative pb-[11%]">
          <span className="absolute top-1/2 left-1/2 h-[56%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
        </div>

        <div className={cn("relative", MOBILE_ASPECT)}>
          <AnimatePresence initial={false}>
            {image ? (
              <m.div
                key={image.src}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, delay: 0.24, ease: EASE },
                }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                className="absolute inset-0 bg-paper"
              >
                <Image
                  src={image.src}
                  alt={alt}
                  fill
                  sizes={PHONE_SIZES}
                  quality={SCREEN_QUALITY}
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
                <span className="block h-[8%] opacity-40">
                  <SpykeMark sizes="32px" />
                </span>
              </m.div>
            )}
          </AnimatePresence>

          <LiveFrames
            current={frame}
            viewport={MOBILE_VIEWPORT}
            titleOf={frameTitleOf}
            posterOf={posterOf}
            posterSizes={PHONE_SIZES}
            shownClassName="delay-300"
            onFail={onLiveFail}
          />
        </div>
      </div>
    </figure>
  );
}
