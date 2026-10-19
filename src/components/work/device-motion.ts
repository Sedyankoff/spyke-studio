import { animate } from "framer-motion";

/**
 * Motion of the two devices as objects in a scene: the monitor establishes
 * it, the phone follows on its own path. Everything is transform and opacity,
 * under the perspective set on their shared cell, and every animation ends
 * at identity — framer-motion then writes `transform: none`, so a settled
 * device holds no 3D layer that could soften its screenshots.
 *
 * Animations start from the device's current values, so a new one simply
 * takes over from one still in flight: rapid switching never lets an old
 * movement finish over a newly selected project.
 */

const SPATIAL = [0.22, 1, 0.36, 1] as const;
const LEAVE = [0.4, 0, 0.6, 1] as const;

/** Distances shrink with the devices on narrow screens. */
function reach() {
  return window.matchMedia("(min-width: 1024px)").matches
    ? 1
    : window.matchMedia("(min-width: 640px)").matches
      ? 0.75
      : 0.5;
}

/** Where the devices wait, out of place, until the scene first comes into view. */
export function placeOffstage(monitor: HTMLElement, phone: HTMLElement) {
  const k = reach();
  animate(
    monitor,
    { opacity: 0, x: -56 * k, y: 72 * k, rotateY: 12, rotateX: 5, scale: 0.92 },
    { duration: 0 },
  );
  animate(
    phone,
    { opacity: 0, x: 80 * k, y: 140 * k, rotate: 8, scale: 0.86 },
    { duration: 0 },
  );
}

/**
 * The first arrival: the monitor rises out of a slight turn and settles
 * square to the reader; the phone comes up steeper from the right a beat
 * later, straightening as it lands against the monitor's corner.
 */
export function enter(monitor: HTMLElement, phone: HTMLElement) {
  animate(
    monitor,
    { opacity: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, scale: 1 },
    {
      duration: 1.15,
      ease: SPATIAL,
      opacity: { duration: 0.6, ease: "linear" },
    },
  );
  animate(
    phone,
    { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 },
    {
      duration: 1.05,
      delay: 0.28,
      ease: SPATIAL,
      opacity: { duration: 0.5, delay: 0.28, ease: "linear" },
    },
  );
}

/**
 * A change of project, in the direction of travel (1 = on to the next).
 * The monitor gives way — a short step back against the direction, turning
 * slightly — while its window shrinks into its icon, then returns as the new
 * one grows. The phone swings out the other way and back a moment later,
 * its new screen arriving as it lands. Both stay fully visible: the scene
 * changes, it does not disappear.
 */
export function change(
  monitor: HTMLElement,
  phone: HTMLElement,
  direction: 1 | -1,
) {
  const k = reach();
  const d = direction;

  animate(
    monitor,
    {
      x: [null, -22 * k * d, 0],
      y: [null, 8 * k, 0],
      rotateY: [null, -6 * d, 0],
      scale: [null, 0.965, 1],
      opacity: 1,
    },
    { duration: 0.85, times: [0, 0.32, 1], ease: [LEAVE, SPATIAL] },
  );
  animate(
    phone,
    {
      x: [null, 40 * k * d, 0],
      y: [null, 30 * k, 0],
      rotate: [null, 5 * d, 0],
      scale: [null, 0.94, 1],
      opacity: 1,
    },
    {
      duration: 0.95,
      delay: 0.06,
      times: [0, 0.34, 1],
      ease: [LEAVE, SPATIAL],
    },
  );
}

/** Reduced motion: put both devices straight where they belong. */
export function settle(monitor: HTMLElement, phone: HTMLElement) {
  const still = { opacity: 1, x: 0, y: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1 };
  animate(monitor, still, { duration: 0 });
  animate(phone, still, { duration: 0 });
}
