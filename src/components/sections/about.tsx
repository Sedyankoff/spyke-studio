import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/content/dictionary";
import { portrait } from "@/content/site";

/**
 * Identity on the left — a small rectangular portrait with the name and role
 * directly under it — and the biography on the right, starting level with
 * the top of the photograph. On phones the portrait sits beside the name.
 */
export function About({ copy }: { copy: Dictionary["about"] }) {
  return (
    <Section
      id="about"
      labelledBy="about-title"
      tone="dark"
      className="section-y isolate overflow-hidden bg-void text-paper"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="grain absolute inset-0 opacity-[0.05]" />
      </div>

      <Container>
        <p className="meta flex items-center gap-3 text-paper/60">
          <span aria-hidden="true" className="h-px w-6 bg-red" />
          {copy.eyebrow}
        </p>

        <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Identity ----------------------------------------------------- */}
          <div className="flex items-end gap-5 sm:gap-8 lg:flex-col lg:items-start lg:gap-7">
            <div
              data-reveal="fade"
              className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-tile ring-1 ring-line-invert min-[400px]:w-28 sm:w-36 lg:w-60"
            >
              <Image
                src={portrait.src}
                alt={copy.portraitAlt}
                fill
                sizes="(min-width: 1024px) 15rem, (min-width: 640px) 9rem, 7rem"
                className="object-cover object-[47%_50%]"
              />
            </div>

            <div className="min-w-0">
              <h2
                id="about-title"
                data-reveal="up"
                className="display-section text-paper"
              >
                {copy.name}
              </h2>
              <p
                data-reveal="up"
                data-rd="1"
                className="mt-3 text-sm font-medium text-paper/65 sm:mt-4"
              >
                {copy.role}
              </p>
            </div>
          </div>

          {/* Biography ---------------------------------------------------- */}
          <div className="max-w-2xl space-y-6 border-line-invert lg:border-l lg:pl-12">
            {copy.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                data-reveal="up"
                data-rd={String(index + 1)}
                className={
                  index === 0
                    ? "text-lg leading-relaxed font-medium text-paper sm:text-[1.3125rem]"
                    : "body-lg text-paper/70"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
