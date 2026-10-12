import { ArrowDown } from "lucide-react";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/content/dictionary";
import { siteConfig } from "@/content/site";

/**
 * Typography-led on paper: the headline at full measure, a hairline beneath
 * it, then the description and the two actions on one line. The dark About
 * section follows directly, so the change of surface marks the transition.
 */
export function Hero({ copy }: { copy: Dictionary["hero"] }) {
  return (
    <Section
      id="hero"
      labelledBy="hero-title"
      className="flex min-h-svh flex-col bg-paper text-ink"
    >
      {/* A slightly wider measure than the other sections gives the headline room. */}
      <Container className="flex max-w-[86rem] flex-1 flex-col justify-center pt-32 pb-16 sm:pt-36 sm:pb-20">
        <span
          aria-hidden="true"
          className="animate-rise block h-px w-9 bg-red [animation-delay:150ms] sm:w-12"
        />

        <h1
          id="hero-title"
          className="display-hero animate-rise mt-7 text-ink [animation-delay:250ms] sm:mt-8"
        >
          {copy.statementLines.map((line, index) => (
            <span key={line} className="block sm:whitespace-nowrap">
              {line}
              {index < copy.statementLines.length - 1 && " "}
            </span>
          ))}
        </h1>

        <div className="animate-rise mt-10 border-t border-line pt-8 [animation-delay:400ms] sm:mt-12 lg:flex lg:items-start lg:justify-between lg:gap-12">
          <p className="max-w-[44ch] text-[15px] leading-relaxed text-ink-soft sm:text-lg">
            {copy.lead}
          </p>

          <div className="mt-8 flex shrink-0 flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center lg:mt-0">
            <ButtonLink href="#work" variant="primary" size="lg">
              {copy.primaryCta}
              <ArrowDown
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:translate-y-0.5"
              />
            </ButtonLink>
            <ButtonLink
              href={`mailto:${siteConfig.email}`}
              variant="outline"
              size="lg"
            >
              {copy.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
