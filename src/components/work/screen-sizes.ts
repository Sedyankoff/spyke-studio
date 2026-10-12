/**
 * Rendered widths of the project screenshots, so `next/image` picks a
 * variant at least as wide as the screen it fills — never one it has to
 * upscale. They follow the layout in `sections/work.tsx`: the Container
 * (96rem max there, 20 / 32 / 48px gutters), the 4fr / 3fr columns from lg
 * with a 64px gap, the monitor at 82% of the preview and the phone at 22%
 * (78% and 30% on phones), less the bezels.
 */
export const MONITOR_SIZES =
  "(min-width: 1536px) 625px, (min-width: 1024px) calc(47vw - 95px), (min-width: 640px) calc(82vw - 68px), calc(78vw - 43px)";

export const PHONE_SIZES =
  "(min-width: 1536px) 165px, (min-width: 1024px) calc(12vw - 19px), (min-width: 640px) calc(21vw - 13px), calc(29vw - 11px)";

/**
 * Screenshots are mostly UI text, which the default quality visibly softens.
 * Allowed in `next.config.ts` → `images.qualities`.
 */
export const SCREEN_QUALITY = 90;

/**
 * The browser bar on top of the monitor's screen. The screen's height is this
 * bar plus a box with the desktop captures' proportions (1919 × 919), so the
 * screenshots fill the opening by width and nothing is scaled up. The live
 * frame starts right below the bar.
 */
export const BAR_HEIGHT = "h-6 sm:h-7 lg:h-8";
export const BELOW_BAR = "top-6 sm:top-7 lg:top-8";
export const CAPTURE_ASPECT = "aspect-[1919/919]";
