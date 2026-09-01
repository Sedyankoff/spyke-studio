"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { SectionId } from "@/content/schema";

interface CommandContextValue {
  open: boolean;
  openCommand: () => void;
  closeCommand: () => void;
  toggleCommand: () => void;
  activeSection: SectionId;
}

const CommandContext = createContext<CommandContextValue | null>(null);

export function useCommand() {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error("useCommand must be used within a CommandProvider");
  }
  return context;
}

export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  const openCommand = useCallback(() => setOpen(true), []);
  const closeCommand = useCallback(() => setOpen(false), []);
  const toggleCommand = useCallback(() => setOpen((value) => !value), []);

  useEffect(() => {
    const sections =
      document.querySelectorAll<HTMLElement>("[data-section]");
    if (sections.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.section;
          if (id) ratios.set(id, entry.intersectionRatio);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestId = id;
            bestRatio = ratio;
          }
        }
        if (bestId) setActiveSection(bestId as SectionId);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.3, 0.6, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    const first = sections[0].dataset.section as SectionId;
    const last = sections[sections.length - 1].dataset.section as SectionId;

    const onScroll = () => {
      const { scrollHeight } = document.documentElement;
      if (window.scrollY <= 8) setActiveSection(first);
      else if (window.innerHeight + window.scrollY >= scrollHeight - 8) {
        setActiveSection(last);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const value = useMemo(
    () => ({ open, openCommand, closeCommand, toggleCommand, activeSection }),
    [open, openCommand, closeCommand, toggleCommand, activeSection],
  );

  return (
    <CommandContext.Provider value={value}>{children}</CommandContext.Provider>
  );
}
