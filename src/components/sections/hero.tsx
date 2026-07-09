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
      className="flex min-h-svh items-center overflow-hidden pt-32 pb-20 sm:pt-36"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_55%)]" />
        <m.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, -70, 0], y: [0, 50, 0], opacity: [0.55, 1, 0.55] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-48 right-[-12%] h-[38rem] w-[38rem] rounded-full bg-accent/[0.07] blur-[140px]"
        />
        <m.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 60, 0], y: [0, -40, 0], opacity: [0.5, 0.9, 0.5] }
          }
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full bg-white/[0.03] blur-[120px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
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
              className="mt-7 text-5xl leading-[1.04] font-semibold tracking-[-0.03em] text-foreground sm:text-6xl xl:text-7xl"
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

          <m.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: EASE_OUT }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-accent/[0.05] blur-3xl"
            />
            <Parallax amount={26}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/portrait.jpg"
                  alt={`${siteConfig.author.name}, founder of ${siteConfig.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, (min-width: 640px) 28rem, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute top-5 right-5 flex items-center gap-2 rounded-full border border-white/10 bg-background/60 px-3.5 py-2 backdrop-blur-md">
                  <span aria-hidden="true" className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/85 uppercase">
                    {siteConfig.author.availability}
                  </span>
                </div>
                <p className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.3em] text-white/55 uppercase">
                  {siteConfig.author.location} — {siteConfig.author.role}
                </p>
              </div>
            </Parallax>
          </m.div>
        </div>
      </Container>

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
