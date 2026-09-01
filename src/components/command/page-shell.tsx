"use client";

import { useCommand } from "@/components/command/command-context";

export function PageShell({ children }: { children: React.ReactNode }) {
  const { open } = useCommand();

  return (
    <div
      inert={open}
      style={{
        transform: open ? "translateX(-4vw) scale(0.988)" : undefined,
        transformOrigin: "left center",
        transition: "transform 480ms var(--ease-spatial)",
      }}
    >
      {children}
    </div>
  );
}
