"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SCREEN_QUALITY } from "@/components/work/screen-sizes";
import type { ImageAsset } from "@/content/schema";
import { cn } from "@/lib/utils";

/** A frame that has not loaded by now is treated as unavailable. */
const LOAD_TIMEOUT = 10_000;
/**
 * `load` only means the document is in; a client-rendered site paints its
 * content after that, so the screenshot stays up a little longer.
 */
const SETTLE_DELAY = 2_500;

interface LivePreviewProps {
  url: string;
  title: string;
  /**
   * The CSS width the site is laid out at. The frame really is this wide —
   * its media queries see this width — and is then scaled to fit the screen.
   */
  viewport: number;
  /** Shown until the site has loaded, so the screen is never blank. */
  poster?: ImageAsset;
  /** `sizes` for the poster: the screen's rendered width. */
  posterSizes: string;
  /**
   * Announced over the poster while the site loads. Without it, only a small
   * indicator shows — for a second frame that loads alongside the first.
   */
  loadingLabel?: string;
  onFail: () => void;
}

/**
 * A running product inside one of the devices. It renders the site at a
 * real device width and scales it to the screen, so the visitor sees — and
 * can scroll, click and navigate — the layout the site serves at that width,
 * not a squeezed one.
 *
 * Until the frame has loaded and settled, it stays transparent over the
 * screenshot and a small status shows it is on its way; a site's own blank
 * page never shows. If the frame does not load in time, the screen falls
 * back to the screenshots altogether.
 */
export function LivePreview({
  url,
  title,
  viewport,
  poster,
  posterSizes,
  loadingLabel,
  onFail,
}: LivePreviewProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const failRef = useRef(onFail);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    failRef.current = onFail;
  });

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      // A box that is not laid out (a hidden ancestor, styles mid-reload)
      // measures 0 × 0. There is nothing to fit to: the scale would be 0 and
      // the frame's size 0 / 0. Keep the last real size instead — clearing it
      // would unmount the frame and reload the site when the box returns.
      if (width > 0 && height > 0) setSize({ width, height });
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => failRef.current(), LOAD_TIMEOUT);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    const timer = window.setTimeout(() => setRevealed(true), SETTLE_DELAY);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  const scale = size ? Math.min(1, size.width / viewport) : 1;

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-[#0c0b0a]">
      {poster && (
        <Image
          src={poster.src}
          alt=""
          fill
          sizes={posterSizes}
          quality={SCREEN_QUALITY}
          className="object-cover object-top"
        />
      )}

      {!revealed &&
        (loadingLabel ? (
          <p
            role="status"
            className="absolute bottom-[5%] left-1/2 flex h-7 -translate-x-1/2 items-center gap-2 rounded-full bg-black/70 px-3.5 font-mono text-[10px] leading-none text-paper/80 lg:text-[11px]"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red motion-safe:animate-pulse" />
            {loadingLabel}
          </p>
        ) : (
          <span
            aria-hidden="true"
            className="absolute bottom-[4%] left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-black/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red motion-safe:animate-pulse" />
          </span>
        ))}

      {size && (
        <iframe
          src={url}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute top-0 left-0 origin-top-left border-0 transition-opacity duration-500",
            revealed ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          style={{
            width: size.width / scale,
            height: size.height / scale,
            transform: `scale(${scale})`,
          }}
        />
      )}
    </div>
  );
}
