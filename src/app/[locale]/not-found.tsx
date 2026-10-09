import Link from "next/link";
import { SpykeLogo } from "@/components/brand/spyke-logo";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/content";

export default function NotFound() {
  const dictionary = getDictionary(defaultLocale);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-[34px]">
        <SpykeLogo />
      </span>
      <p className="display-section text-red">404</p>
      <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">
        {dictionary.meta.description}
      </p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-2 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-red"
      >
        {dictionary.nav.items.about.label}
      </Link>
    </main>
  );
}
