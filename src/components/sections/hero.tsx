import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/content/dictionary";
import { siteConfig } from "@/content/site";

/**
 * The photograph fills the hero from the right: at least 80% of the width,
 * wider only if its own proportions ask for it, so a portrait image is not
 * zoomed into a narrow strip and a landscape one simply goes full-bleed. Its
 * leading edge falls away into deep black under the copy, and a layered grade
 * carries that darkness gently into the picture.
 */
export function Hero({ copy }: { copy: Dictionary["hero"] }) {
  const image = siteConfig.heroImage;

  return (
    <Section
      id="hero"
      labelledBy="hero-title"
      tone="dark"
      className="isolate flex min-h-svh flex-col overflow-hidden bg-void text-paper"
    >
      <div
        aria-hidden="true"
        className="hero-frame animate-fade absolute inset-0 -z-10"
        style={{ "--hero-ratio": image.width / image.height } as React.CSSProperties}
      >
        <div className="hero-plate absolute inset-y-0 right-0">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            fetchPriority="high"
            loading="eager"
            className="hero-photo object-cover"
            style={{ objectPosition: image.focus }}
          />
        </div>
        <div className="hero-grade absolute inset-0" />
        <div className="hero-top absolute inset-x-0 top-0 h-32 sm:h-40" />
        <div className="grain absolute inset-0 opacity-[0.05]" />
      </div>

      {/* A slightly wider measure than the other sections pulls the copy left. */}
      <Container className="flex max-w-[86rem] flex-1 flex-col pt-32 pb-7 sm:pt-36 sm:pb-9 lg:pb-11">
        <div className="flex flex-1 flex-col justify-center">
          <p className="animate-rise flex items-center gap-3.5 [animation-delay:200ms]">
            <span aria-hidden="true" className="h-px w-9 bg-red sm:w-12" />
            <span className="meta text-paper/70">{copy.eyebrow}</span>
          </p>

          <h1
            id="hero-title"
            className="display-hero hero-copy animate-rise mt-6 text-paper [animation-delay:300ms] sm:mt-7"
          >
            {copy.statementLines.map((line, index) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
                {index < copy.statementLines.length - 1 && " "}
              </span>
            ))}
          </h1>

          <p className="animate-rise mt-6 max-w-[36ch] text-[15px] leading-relaxed text-paper/75 [animation-delay:420ms] sm:mt-7 sm:text-lg">
            {copy.lead}
          </p>

          <div className="animate-rise mt-9 flex flex-col gap-3 [animation-delay:520ms] min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center">
            <ButtonLink href="#work" variant="primary" size="lg">
              {copy.primaryCta}
              <ArrowDown
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:translate-y-0.5"
              />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost" size="lg">
              {copy.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <p className="animate-fade meta mt-12 text-paper/50 [animation-delay:700ms]">
          {copy.location}
        </p>
      </Container>
    </Section>
  );
}
