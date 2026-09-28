"use client";

import { useCommand } from "@/components/command/command-context";

/**
 * The page stays exactly where it is while the navigation is open — the panel
 * scrolls it to preview sections, so it must not be transformed underneath.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  const { open } = useCommand();

  return <div inert={open}>{children}</div>;
}
