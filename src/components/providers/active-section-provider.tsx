"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { SectionId } from "@/types";

interface ActiveSectionContextValue {
  activeSection: SectionId | null;
  setActiveSection: (id: SectionId) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextValue | null>(
  null,
);

export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error(
      "useActiveSection must be used within an ActiveSectionProvider",
    );
  }
  return context;
}

export function ActiveSectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const value = useMemo(
    () => ({ activeSection, setActiveSection }),
    [activeSection],
  );

  return (
    <ActiveSectionContext.Provider value={value}>
      {children}
    </ActiveSectionContext.Provider>
  );
}
