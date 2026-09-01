"use client";

import { useEffect } from "react";

/** Matches the `-10%` bottom root margin below, with room to spare. */
const OFFSCREEN = 1.05;

/**
 * One observer for every `[data-reveal]` element on the page. Sections stay
 * server-rendered and only declare the attribute.
 *
 * The hidden state is applied here rather than in the stylesheet: markup that
 * hides itself before JavaScript confirms it can run risks leaving a reader
 * with a blank page, and gating it on an attribute set before paint makes
 * React treat the document element as a hydration mismatch. Anything already
 * on screen when this runs is simply left alone.
 */
export function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (nodes.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const offscreen = window.innerHeight * OFFSCREEN;
    const pending: HTMLElement[] = [];

    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top < offscreen) return;
      node.classList.add("is-out");
      pending.push(node);
    });

    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("is-out");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    pending.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return null;
}
