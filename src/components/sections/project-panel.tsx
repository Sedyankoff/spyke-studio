"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Tilt } from "@/components/animations/tilt";
import { StaggerGroup, StaggerItem } from "@/components/animations/stagger";
import { Badge } from "@/components/ui/badge";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PhoneFrame } from "@/components/ui/phone-frame";
import type { Project } from "@/types";

interface ProjectPanelProps {
  project: Project;
  index: number;
  total: number;
}

export function ProjectPanel({ project, index, total }: ProjectPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isStacked = useMediaQuery("(min-width: 1024px)");
  const isLast = index === total - 1;

  // 0 → 1 while the next panel slides over this one.
  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });
  const scale = useTransform(exitProgress, [0, 1], [1, 0.94]);
  const dim = useTransform(exitProgress, [0, 1], [0, 0.65]);

  const animateExit = isStacked && !shouldReduceMotion && !isLast;
  const reversed = index % 2 === 1;

  return (
    <div ref={ref} className="lg:sticky lg:top-0">
      <m.article
        style={animateExit ? { scale } : undefined}
        className="relative flex flex-col justify-center overflow-hidden rounded-t-[2rem] border-t border-white/[0.08] bg-background py-20 sm:rounded-t-[3rem] lg:h-svh lg:py-0"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(52rem 30rem at 76% 10%, ${project.theme.primary}, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(44rem 28rem at 14% 92%, ${project.theme.secondary}, transparent 70%)`,
            }}
          />
        </div>

        <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <StaggerGroup stagger={0.07} className={cn(reversed && "lg:order-2")}>
            <StaggerItem>
              <p className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.25em] text-faint uppercase">
                <span className="text-accent">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
                <span>{project.year}</span>
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400/90"
                  />
                  {project.status}
                </span>
              </p>
            </StaggerItem>

            <StaggerItem>
              <h3 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {project.name}
              </h3>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-3 font-serif text-lg text-foreground/75 italic sm:text-xl">
                {project.tagline}
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
                {project.description}
              </p>
            </StaggerItem>

            <StaggerItem>
              <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-[13px] text-muted"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/80"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-6 space-y-3 border-l border-white/10 pl-5">
                <p className="text-[13px] leading-relaxed text-faint">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase">
                    Challenge ·{" "}
                  </span>
                  {project.challenge}
                </p>
                <p className="text-[13px] leading-relaxed text-faint">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase">
                    Solution ·{" "}
                  </span>
                  {project.solution}
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                {project.stack.map((technology) => (
                  <Badge key={technology}>{technology}</Badge>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <p className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
                  Role — {project.role}
                </p>
                {project.links?.live && (
                  <ButtonLink
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="sm"
                  >
                    Visit live site
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </ButtonLink>
                )}
              </div>
            </StaggerItem>
          </StaggerGroup>

          <m.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={cn("relative", reversed && "lg:order-1")}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-x-8 bottom-[-3rem] h-36 blur-3xl"
              style={{ background: project.theme.primary }}
            />
            <Tilt maxTilt={2.5}>
              <div className="relative pr-6 pb-10 sm:pr-10">
                <BrowserFrame
                  image={project.images.desktop}
                  domain={project.domain}
                  sizes="(min-width: 1024px) 46vw, (min-width: 640px) 85vw, 100vw"
                />
                <PhoneFrame
                  image={project.images.phone}
                  sizes="(min-width: 1024px) 11vw, 22vw"
                  className="absolute right-0 bottom-0 w-[24%] min-w-[92px]"
                />
              </div>
            </Tilt>
          </m.div>
        </Container>
      </m.article>

      {animateExit && (
        <m.div
          aria-hidden="true"
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 bg-background"
        />
      )}
    </div>
  );
}
