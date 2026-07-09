"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useActiveSection } from "@/components/providers/active-section-provider";
import type { SectionId } from "@/types";

/**
 * Marks a section as active in the navigation when it crosses the
 * middle band of the viewport.
 */
export function useSectionSpy(id: SectionId) {
  const { setActiveSection } = useActiveSection();
  const { ref, inView } = useInView({ rootMargin: "-40% 0px -55% 0px" });

  useEffect(() => {
    if (inView) {
      setActiveSection(id);
    }
  }, [inView, id, setActiveSection]);

  return ref;
}
