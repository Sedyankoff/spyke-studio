/**
 * The root layout only passes through: `<html>` and `<body>` come from
 * `[locale]/layout.tsx`, which knows the language, and from `not-found.tsx`
 * for unmatched URLs. Its presence is what lets the root `not-found.tsx`
 * serve the branded 404 without the experimental `global-not-found`.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return children;
}
