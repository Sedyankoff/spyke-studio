/**
 * Rendered widths of the project screenshots, so `next/image` picks a
 * variant at least as wide as the screen it fills — never one it has to
 * upscale. They follow the layout in `sections/work.tsx`: the Container
 * (96rem max there, 20 / 32 / 48px gutters), the 3fr / 2fr columns from lg
 * with a 64px gap, the monitor at 84% of the preview and the phone at 23%
 * (80% and 30% on phones), less the bezels.
 */
export const MONITOR_SIZES =
  "(min-width: 1536px) 672px, (min-width: 1024px) calc(50.4vw - 103px), (min-width: 640px) calc(84vw - 72px), calc(80vw - 46px)";

export const PHONE_SIZES =
  "(min-width: 1536px) 181px, (min-width: 1024px) calc(13.2vw - 21px), (min-width: 640px) calc(22vw - 14px), calc(28.6vw - 11px)";

/**
 * Screenshots are mostly UI text, which the default quality visibly softens.
 * Allowed in `next.config.ts` → `images.qualities`.
 */
export const SCREEN_QUALITY = 90;

/**
 * The monitor's screen has the desktop captures' proportions (1919 × 919),
 * so the screenshots fill it by width and nothing is scaled up; the live
 * frame covers it exactly.
 */
export const CAPTURE_ASPECT = "aspect-[1919/919]";

/** The phone's page area has the mobile captures' proportions (440 × 852). */
export const MOBILE_ASPECT = "aspect-[440/852]";

/**
 * The CSS viewport each live frame is laid out in before it is scaled to its
 * screen. The phone's is a real phone's width (and the page area's
 * proportions), so the site serves its mobile layout rather than a shrunken
 * desktop one.
 */
export const DESKTOP_VIEWPORT = 1280;
export const MOBILE_VIEWPORT = 390;
