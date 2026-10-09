import { ArrowUp } from "lucide-react";
import { SpykeLogo } from "@/components/brand/spyke-logo";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";
import { navSectionIds } from "@/content";
import { siteConfig } from "@/content/site";
import type { Dictionary } from "@/content/dictionary";

interface FooterProps {
  copy: Dictionary["footer"];
  nav: Dictionary["nav"];
  common: Dictionary["common"];
}

export function Footer({ copy, nav, common }: FooterProps) {
  return (
    <footer data-tone="dark" className="relative overflow-hidden bg-ink text-paper">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-red via-red/30 to-transparent"
      />
      <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.04]" />

      <Container className="relative py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <a
              href="#hero"
              aria-label={siteConfig.name}
              className="block h-8 w-fit sm:h-9"
            >
              <SpykeLogo tone="paper" sizes="170px" />
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/55">
              {copy.tagline}
            </p>
          </div>

          <nav aria-label={nav.label}>
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-1">
              {navSectionIds.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="link-underline text-sm text-paper/55 transition-colors hover:text-paper"
                  >
                    {nav.items[id].label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks tone="paper" />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-invert-soft pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {copy.owner}. {copy.rights}
          </p>
          <p>{copy.builtBy}</p>
          <a
            href="#hero"
            className="group inline-flex items-center gap-2 font-mono tracking-[0.18em] uppercase transition-colors hover:text-paper"
          >
            {common.backToTop}
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line-invert transition-colors duration-200 group-hover:border-red group-hover:bg-red">
              <ArrowUp
                aria-hidden="true"
                className="h-3 w-3 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:-translate-y-0.5"
              />
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
