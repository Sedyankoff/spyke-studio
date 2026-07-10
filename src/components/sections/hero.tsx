"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { EASE_OUT, maskRise, staggerChildren } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Parallax } from "@/components/animations/parallax";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { SocialLinks } from "@/components/ui/social-links";
import { useSmoothScroll } from "@/components/providers/lenis-provider";

const HEADLINE_WORDS = ["I", "build", "software", "that", "feels"];
const HEADLINE_ACCENT = "inevitable.";

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollCueOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  const goTo = (event: React.MouseEvent, href: string) => {
    event.preventDefault();
    scrollTo(href);
    window.history.replaceState(null, "", href);
  };

  return (
    <Section
      id="home"
      className="flex min-h-svh items-center overflow-hidden pt-36 pb-24 sm:pt-40"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Parallax amount={50} className="absolute inset-x-0 -inset-y-16">
          <m.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            <Image
              src="/images/portrait.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[62%_50%]"
            />
          </m.div>
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 to-background/10" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <Container>
        <div className="max-w-4xl">
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-accent uppercase"
          >
            <span aria-hidden="true" className="h-px w-10 bg-accent/50" />
            {siteConfig.author.name} · Founder, {siteConfig.name}
          </m.p>

          <h1
            id="home-title"
            className="mt-7 text-5xl leading-[1.04] font-semibold tracking-[-0.03em] text-foreground sm:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            <span className="sr-only">
              {HEADLINE_WORDS.join(" ")} {HEADLINE_ACCENT}
            </span>
            <m.span
              aria-hidden="true"
              initial="hidden"
              animate="visible"
              variants={staggerChildren(0.07, 0.65)}
            >
              {[...HEADLINE_WORDS, HEADLINE_ACCENT].map((word, index) => {
                const isAccent = word === HEADLINE_ACCENT;
                return (
                  <span
                    key={word}
                    className={cn(
                      "inline-block overflow-hidden pb-[0.1em] align-bottom",
                      index < HEADLINE_WORDS.length && "mr-[0.24em]",
                    )}
                  >
                    <m.span
                      variants={maskRise}
                      className={cn(
                        "inline-block will-change-transform",
                        isAccent &&
                          "font-serif font-normal tracking-normal text-white italic",
                      )}
                    >
                      {word}
                    </m.span>
                  </span>
                );
              })}
            </m.span>
          </h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE_OUT }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Full-stack engineer and founder of {siteConfig.name} — an
            independent software studio where architecture, performance and
            design are treated as one discipline.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE_OUT }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <ButtonLink
                href="#projects"
                size="lg"
                onClick={(event) => goTo(event, "#projects")}
              >
                Explore the work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink
                href="#contact"
                variant="outline"
                size="lg"
                onClick={(event) => goTo(event, "#contact")}
                className="bg-background/30 backdrop-blur-sm"
              >
                Start a conversation
              </ButtonLink>
            </Magnetic>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.5 }}
            className="mt-11"
          >
            <SocialLinks />
          </m.div>
        </div>
      </Container>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.7 }}
        className="absolute right-8 bottom-10 hidden items-center gap-2.5 rounded-full border border-white/10 bg-background/50 px-4 py-2.5 backdrop-blur-md lg:flex"
      >
        <span aria-hidden="true" className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/85 uppercase">
          {siteConfig.author.availability} · {siteConfig.author.location}
        </span>
      </m.div>

      <m.div
        style={{ opacity: shouldReduceMotion ? 1 : scrollCueOpacity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] tracking-[0.35em] text-faint uppercase">
            Scroll
          </span>
          <span className="h-10 w-px overflow-hidden">
            <m.span
              animate={
                shouldReduceMotion ? undefined : { y: ["-100%", "100%"] }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="block h-full w-px bg-gradient-to-b from-transparent via-white/60 to-transparent"
            />
          </span>
        </m.div>
      </m.div>
    </Section>
  );
}
