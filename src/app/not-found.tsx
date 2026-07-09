import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase">
        404
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        The address may have changed, or it never shipped. Either way, the
        studio is one click away.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-white"
      >
        Back to the studio
      </Link>
    </main>
  );
}
