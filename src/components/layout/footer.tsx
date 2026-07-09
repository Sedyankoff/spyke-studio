"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { contactNavItem, navItems } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { useSmoothScroll } from "@/components/providers/lenis-provider";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import type { NavItem } from "@/types";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  const navigate = (event: React.MouseEvent, item: NavItem) => {
    event.preventDefault();
    scrollTo(item.href);
    window.history.replaceState(null, "", item.href);
  };

  return (
    <footer className="relative border-t border-white/[0.06]">
      <Container className="py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo className="text-2xl" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Independent software studio — engineering digital products with
              intent.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-14 gap-y-3">
              {[...navItems, contactNavItem].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => navigate(event, item)}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-5">
            <SocialLinks />
            <LocalTime />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Designed &amp; engineered by {siteConfig.author.name}.</p>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="group inline-flex items-center gap-1.5 font-mono tracking-[0.2em] uppercase transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </Container>
    </footer>
  );
}

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: siteConfig.author.timeZone,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = setInterval(tick, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="font-mono text-[11px] tracking-[0.25em] text-faint uppercase">
      {siteConfig.author.location} · {time ?? "--:--"}
    </p>
  );
}
