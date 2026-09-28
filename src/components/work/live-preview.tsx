"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/content/schema";
import { cn } from "@/lib/utils";

/** The site is laid out at this width, then scaled to fit the window. */
const VIRTUAL_WIDTH = 1280;
/** A frame that has not loaded by now is treated as unavailable. */
const LOAD_TIMEOUT = 15_000;

interface LivePreviewProps {
  url: string;
  title: string;
  /** Shown underneath until the live site has painted. */
  poster?: ProjectImage;
  onFail: () => void;
}

/**
 * The running product inside the workstation window. It renders the site at
 * a desktop width and scales it to the window, so the visitor sees — and can
 * scroll, click and navigate — the real layout rather than a squeezed one.
 *
 * The screenshot stays in place until the frame reports it has loaded, so
 * there is never a blank box; if it never does, the window falls back.
 */
export function LivePreview({ url, title, poster, onFail }: LivePreviewProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const failRef = useRef(onFail);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [loaded, setLoaded] = useState(false);

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

  const scale = size ? Math.min(1, size.width / VIRTUAL_WIDTH) : 1;

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-[#0c0b0a]">
      {poster && (
        <Image
          src={poster.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 1040px, 84vw"
          className={cn(
            "object-cover object-top transition-opacity duration-500",
            loaded && "opacity-0",
          )}
        />
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
            "absolute top-0 left-0 origin-top-left border-0 bg-white transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
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
