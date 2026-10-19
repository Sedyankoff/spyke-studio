"use client";

import { useState } from "react";
import { LivePreview } from "@/components/work/live-preview";
import type { ImageAsset, ProjectId } from "@/content/schema";
import { cn } from "@/lib/utils";

export interface LiveFrame {
  id: ProjectId;
  url: string;
}

interface LiveFramesProps {
  /** The live site to show now; `null` hides every frame without unloading it. */
  current: LiveFrame | null;
  /**
   * A site the reader is about to open: loaded hidden ahead of time, so it is
   * ready, or nearly, when it comes on.
   */
  warm?: LiveFrame | null;
  /** CSS width each site is laid out at (see `LivePreview`). */
  viewport: number;
  titleOf: (id: ProjectId) => string;
  posterOf: (id: ProjectId) => ImageAsset | undefined;
  posterSizes: string;
  loadingLabel?: string;
  /** Extra classes for the frame on show, e.g. a delay while a window grows. */
  shownClassName?: string;
  onFail: (id: ProjectId) => void;
}

/**
 * The live sites of one device, laid exactly over its screen. A site stays
 * loaded once shown or warmed: stepping to the screenshots or to another
 * project and back never reloads it, and switching projects never flashes a
 * stale page —
 * the frame on show is always the selected project's own.
 */
export function LiveFrames({
  current,
  warm = null,
  viewport,
  titleOf,
  posterOf,
  posterSizes,
  loadingLabel,
  shownClassName,
  onFail,
}: LiveFramesProps) {
  const [frames, setFrames] = useState<LiveFrame[]>([]);

  const missing = [current, warm?.id === current?.id ? null : warm].filter(
    (wanted): wanted is LiveFrame =>
      !!wanted &&
      !frames.some(
        (frame) => frame.id === wanted.id && frame.url === wanted.url,
      ),
  );
  if (missing.length > 0) {
    setFrames([
      ...frames.filter(
        (frame) => !missing.some((wanted) => wanted.id === frame.id),
      ),
      ...missing,
    ]);
  }

  return frames.map((frame) => {
    const shown = current?.id === frame.id;

    return (
      <div
        key={`${frame.id}:${frame.url}`}
        aria-hidden={shown ? undefined : "true"}
        inert={!shown}
        className={cn(
          "absolute inset-0 z-30 transition-opacity ease-[var(--ease-spatial)]",
          shown
            ? cn("opacity-100 duration-300 starting:opacity-0", shownClassName)
            : "pointer-events-none opacity-0 duration-150",
        )}
      >
        <LivePreview
          url={frame.url}
          title={titleOf(frame.id)}
          viewport={viewport}
          poster={posterOf(frame.id)}
          posterSizes={posterSizes}
          loadingLabel={loadingLabel}
          onFail={() => {
            setFrames((list) => list.filter((item) => item.id !== frame.id));
            onFail(frame.id);
          }}
        />
      </div>
    );
  });
}
