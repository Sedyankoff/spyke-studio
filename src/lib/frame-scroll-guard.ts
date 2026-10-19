/**
 * Keeps the page where the reader left it while they use a live site.
 *
 * A framed site's own `scrollIntoView()` — Next.js calls it on route changes,
 * MUI when an accordion opens — is carried by the browser through every
 * scrollable ancestor, across the frame and the origin boundary alike, so it
 * scrolls this page as well: a click inside the monitor could send the page
 * gliding away. Nothing on this side can intercept the call (the frames are
 * cross-origin, and a sandbox tight enough to stop it would stop the sites),
 * so the page puts such a scroll back as it starts.
 *
 * Only while focus is inside a live frame — the reader has clicked into the
 * site, which is how those calls come about. Then a scroll that follows no
 * input on this page (wheel, touch, keys, a pointer pressed here, a resize)
 * is the framed site's. Merely pointing at a frame changes nothing: a wheel
 * that reaches the end of the framed page still carries on to this one.
 */

/** A scroll this soon after the reader's own input is theirs. */
const REQUESTED_WITHIN = 700;
/** Scroll events closer together than this belong to one movement. */
const SEQUENCE_GAP = 200;

const INPUTS = ["wheel", "touchstart", "touchmove", "keydown"] as const;

let users = 0;
let detach: (() => void) | null = null;

/** Start guarding (once for any number of frames); returns the release. */
export function guardScrollFromFrames(): () => void {
  if (users++ === 0) detach = attach();
  return () => {
    if (--users === 0) {
      detach?.();
      detach = null;
    }
  };
}

function attach() {
  let anchor = window.scrollY;
  let lastInput = -Infinity;
  let pressed = false;
  let lastScroll = -Infinity;
  let allowed = true;

  const onInput = () => {
    lastInput = performance.now();
  };
  const onPress = () => {
    pressed = true;
    onInput();
  };
  const onRelease = () => {
    pressed = false;
    onInput();
  };
  // A press that ends inside a frame never reports its release here.
  const onBlur = () => {
    pressed = false;
  };

  const frameFocused = () =>
    document.activeElement instanceof HTMLIFrameElement &&
    document.activeElement.hasAttribute("data-live-frame");

  const onScroll = () => {
    const now = performance.now();
    const y = window.scrollY;
    // The page's own correction lands here too.
    if (Math.abs(y - anchor) <= 1) return;

    const continuing = now - lastScroll < SEQUENCE_GAP;
    lastScroll = now;
    allowed =
      pressed ||
      now - lastInput < REQUESTED_WITHIN ||
      (continuing && allowed) ||
      !frameFocused();

    if (allowed) {
      anchor = y;
      return;
    }
    // Instant, so it also cancels the smooth scroll the frame started.
    window.scrollTo({ top: anchor, behavior: "instant" });
  };

  for (const type of INPUTS) {
    window.addEventListener(type, onInput, { capture: true, passive: true });
  }
  window.addEventListener("pointerdown", onPress, {
    capture: true,
    passive: true,
  });
  window.addEventListener("pointerup", onRelease, {
    capture: true,
    passive: true,
  });
  window.addEventListener("pointercancel", onRelease, {
    capture: true,
    passive: true,
  });
  window.addEventListener("blur", onBlur);
  window.addEventListener("resize", onInput, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    for (const type of INPUTS) {
      window.removeEventListener(type, onInput, { capture: true });
    }
    window.removeEventListener("pointerdown", onPress, { capture: true });
    window.removeEventListener("pointerup", onRelease, { capture: true });
    window.removeEventListener("pointercancel", onRelease, { capture: true });
    window.removeEventListener("blur", onBlur);
    window.removeEventListener("resize", onInput);
    window.removeEventListener("scroll", onScroll);
  };
}
