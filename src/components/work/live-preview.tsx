"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MONITOR_SIZES, SCREEN_QUALITY } from "@/components/work/screen-sizes";
import type { ImageAsset } from "@/content/schema";
import { cn } from "@/lib/utils";

/** The site is laid out at this width, then scaled to fit the window. */
const VIRTUAL_WIDTH = 1280;
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
  /** Shown until the site has loaded, so the window is never blank. */
  poster?: ImageAsset;
  /** Announced over the poster while the site loads. */
  loadingLabel: string;
  onFail: () => void;
}

/**
 * The running product inside the workstation window. It renders the site at
 * a desktop width and scales it to the window, so the visitor sees — and can
 * scroll, click and navigate — the real layout rather than a squeezed one.
 *
 * Until the frame has loaded and settled, it stays transparent over the
 * screenshot and a small status shows it is on its way; a site's own blank
 * page never shows. If the frame does not load in time, the window falls back to the
 * screenshots altogether.
 */
export function LivePreview({
  url,
  title,
  poster,
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
      setSize({ width, height });
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

  const scale = size ? Math.min(1, size.width / VIRTUAL_WIDTH) : 1;

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-[#0c0b0a]">
      {poster && (
        <Image
          src={poster.src}
          alt=""
          fill
          sizes={MONITOR_SIZES}
          quality={SCREEN_QUALITY}
          className="object-cover object-top"
        />
      )}

      {!revealed && (
        <p
          role="status"
          className="absolute bottom-[5%] left-1/2 flex h-7 -translate-x-1/2 items-center gap-2 rounded-full bg-black/70 px-3.5 font-mono text-[10px] leading-none text-paper/80 lg:text-[11px]"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red motion-safe:animate-pulse" />
          {loadingLabel}
        </p>
      )}

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
