/**
 * Drives the window's scroll position along a cubic Hermite curve.
 *
 * Unlike `scrollTo({ behavior: "smooth" })`, the destination can change while
 * the page is still moving: each retarget starts a new curve from the current
 * position *and velocity*, so the motion bends towards the new section rather
 * than stopping and restarting. That is what lets the navigation panel steer
 * the page as the pointer moves between items.
 *
 * Any wheel or touch input from the reader cancels the motion immediately,
 * so the driver never fights a real scroll.
 */

/** Duration grows gently with distance, within these bounds (seconds). */
const MIN_DURATION = 0.42;
const MAX_DURATION = 0.85;
const PX_PER_SECOND = 9000;

/**
 * A destination. A function is re-read every frame, so the glide still lands
 * exactly if the layout above the target shifts on the way (late images,
 * fonts).
 */
export type ScrollTarget = number | (() => number | null);

export interface ScrollDriver {
  /** Glide towards `target`, retargeting any motion already in flight. */
  to: (target: ScrollTarget) => void;
  /** Move to `target` without animating. */
  jump: (target: ScrollTarget) => void;
  stop: () => void;
}

export function createScrollDriver(): ScrollDriver {
  let frame: number | null = null;
  let source: ScrollTarget = 0;
  let target = 0;

  // The current curve: start position and velocity (px/s), start time, length.
  let from = 0;
  let velocity = 0;
  let start = 0;
  let duration = MIN_DURATION;

  const maxScroll = () =>
    document.documentElement.scrollHeight - window.innerHeight;

  const clamp = (top: number) => Math.max(0, Math.min(top, maxScroll()));

  const resolve = () => {
    const top = typeof source === "function" ? source() : source;
    if (top !== null) target = clamp(top);
  };

  /** Position and velocity on the current curve at time `now`. */
  const sample = (now: number) => {
    const s = Math.min(1, (now - start) / 1000 / duration);
    const s2 = s * s;
    const s3 = s2 * s;
    const tangent = velocity * duration;

    const position =
      (2 * s3 - 3 * s2 + 1) * from +
      (s3 - 2 * s2 + s) * tangent +
      (-2 * s3 + 3 * s2) * target;
    const speed =
      ((6 * s2 - 6 * s) * from +
        (3 * s2 - 4 * s + 1) * tangent +
        (-6 * s2 + 6 * s) * target) /
      duration;

    return { s, position, speed };
  };

  const plan = (now: number, position: number, speed: number) => {
    from = position;
    velocity = speed;
    start = now;
    duration = Math.min(
      MAX_DURATION,
      Math.max(MIN_DURATION, Math.abs(target - from) / PX_PER_SECOND + 0.3),
    );
  };

  /**
   * The stylesheet asks for smooth scrolling (for plain anchor links). While
   * the driver writes positions frame by frame that must be off, or every
   * write would start a smooth scroll of its own.
   */
  const root = () => document.documentElement;
  const write = (top: number) => window.scrollTo(0, top);

  const attach = () => {
    root().style.scrollBehavior = "auto";
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
  };

  const detach = () => {
    root().style.removeProperty("scroll-behavior");
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
  };

  function stop() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    detach();
  }

  function step(now: number) {
    resolve();
    const { s, position } = sample(now);
    write(s >= 1 ? target : position);

    if (s >= 1) {
      stop();
      return;
    }
    frame = requestAnimationFrame(step);
  }

  function to(next: ScrollTarget) {
    const now = performance.now();

    if (frame !== null) {
      // Carry the motion in flight into the new curve.
      const { position, speed } = sample(now);
      source = next;
      resolve();
      plan(now, position, speed);
      return;
    }

    source = next;
    resolve();
    if (Math.abs(window.scrollY - target) < 1) return;

    plan(now, window.scrollY, 0);
    attach();
    frame = requestAnimationFrame(step);
  }

  function jump(next: ScrollTarget) {
    stop();
    source = next;
    resolve();
    root().style.scrollBehavior = "auto";
    write(target);
    root().style.removeProperty("scroll-behavior");
  }

  return { to, jump, stop };
}

/** Document offset of a section, honouring its `scroll-margin-top`. */
export function sectionTop(id: string): number | null {
  const element = document.getElementById(id);
  if (!element) return null;

  const margin = parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  return element.getBoundingClientRect().top + window.scrollY - margin;
}
