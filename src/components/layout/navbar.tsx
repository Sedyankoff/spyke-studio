"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { contactNavItem, navItems } from "@/constants/navigation";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/components/providers/active-section-provider";
import { useSmoothScroll } from "@/components/providers/lenis-provider";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import type { NavItem } from "@/types";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeSection } = useActiveSection();
  const { scrollTo, stop, start } = useSmoothScroll();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  useEffect(() => {
    if (menuOpen) {
      stop();
      document.body.style.overflow = "hidden";
    } else {
      start();
      document.body.style.overflow = "";
    }
    return () => {
      start();
      document.body.style.overflow = "";
    };
  }, [menuOpen, stop, start]);

  const isActive = (item: NavItem) =>
    activeSection !== null && item.sectionIds.includes(activeSection);

  const navigate = (event: React.MouseEvent, item: NavItem) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollTo(item.href);
    window.history.replaceState(null, "", item.href);
  };

  const scrollToTop = () => {
    setMenuOpen(false);
    scrollTo(0);
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:pt-5">
      <m.nav
        aria-label="Primary"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE_OUT }}
        className={cn(
          "flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border py-2 pr-2 pl-5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 md:w-auto md:justify-start",
          scrolled
            ? "border-white/10 bg-background/75 shadow-[0_12px_48px_-16px_rgba(0,0,0,0.7)]"
            : "border-white/[0.06] bg-background/45",
        )}
      >
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="rounded-full"
        >
          <Logo className="text-[17px]" />
        </button>

        <ul className="mx-3 hidden items-center md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(event) => navigate(event, item)}
                aria-current={isActive(item) ? "true" : undefined}
                className={cn(
                  "relative isolate rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                  isActive(item)
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {isActive(item) && (
                  <m.span
                    layoutId="nav-active-pill"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={contactNavItem.href}
          onClick={(event) => navigate(event, contactNavItem)}
          className={cn(
            "hidden h-9 items-center rounded-full px-4 text-[13px] font-medium transition-all duration-300 md:inline-flex",
            activeSection === "contact"
              ? "bg-foreground text-background"
              : "border border-white/15 text-foreground hover:border-white/30 hover:bg-white/[0.06]",
          )}
        >
          Let&apos;s talk
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-foreground md:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
      </m.nav>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            onNavigate={navigate}
            onScrollToTop={scrollToTop}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

interface MobileMenuProps {
  onNavigate: (event: React.MouseEvent, item: NavItem) => void;
  onScrollToTop: () => void;
  onClose: () => void;
}

function MobileMenu({ onNavigate, onScrollToTop, onClose }: MobileMenuProps) {
  const items = [...navItems, contactNavItem];

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between px-6 pt-6">
        <button
          type="button"
          onClick={onScrollToTop}
          aria-label="Scroll to top"
        >
          <Logo className="text-[17px]" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-1 items-center px-8">
        <m.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.06, delayChildren: 0.1 },
            },
          }}
          className="space-y-2"
        >
          {items.map((item) => (
            <m.li
              key={item.href}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE_OUT },
                },
              }}
            >
              <a
                href={item.href}
                onClick={(event) => onNavigate(event, item)}
                className="block py-2 text-4xl font-semibold tracking-tight text-foreground transition-colors hover:text-muted"
              >
                {item.label}
              </a>
            </m.li>
          ))}
        </m.ul>
      </nav>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="px-8 pb-10"
      >
        <SocialLinks />
      </m.div>
    </m.div>
  );
}
