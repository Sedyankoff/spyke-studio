import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/content/dictionary";
import { portrait } from "@/content/site";

/*
 * The avatar crop. The photograph is landscape (1366 × 1152) with the face
 * at about 47% across and the head filling the upper ~40%; a plain cover in
 * a circle would leave the head small among shoulders and backdrop. So the
 * picture is laid out at 1.37× the circle's height — a head-and-shoulders
 * crop — and centred on (47%, 40%). It stays a crop of the original pixels,
 * never an enlargement: `sizes` asks for the larger box.
 */
const ZOOM = 1.37;
const ASPECT = portrait.width / portrait.height;
const FOCUS = { x: 0.47, y: 0.4 };
const crop = {
  width: `${ZOOM * ASPECT * 100}%`,
  height: `${ZOOM * 100}%`,
  left: `${50 - FOCUS.x * ZOOM * ASPECT * 100}%`,
  top: `${50 - FOCUS.y * ZOOM * 100}%`,
} as const;

/**
 * A short personal introduction on the hero's charcoal. It opens like every
 * other section — a hairline and the section label — then sets a compact
 * profile (a small round portrait and the name) beside the biography, in
 * the same label | content rhythm as the Stack and Experience sections.
 *
 * The biography's first paragraph is the lead, in the primary off-white; the
 * other two follow a step smaller and quieter. On phones the profile is
 * centred above the text.
 */
export function About({ copy }: { copy: Dictionary["about"] }) {
  const [lead, ...rest] = copy.paragraphs;

  return (
    <Section
      id="about"
      labelledBy="about-title"
      tone="dark"
      className="bg-[#191919] py-20 text-paper sm:py-24 lg:py-28"
    >
      <Container>
        <div
          aria-hidden="true"
          data-reveal="line"
          className="h-px w-full bg-line-invert"
        />
        <p className="meta mt-5 flex items-center gap-3 text-paper/50">
          <span aria-hidden="true" className="h-px w-6 bg-red" />
          {copy.eyebrow}
        </p>

        <div className="mt-12 grid gap-10 sm:mt-14 lg:mt-16 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          {/* Profile ------------------------------------------------------- */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/*
              A hairline ring with one short red arc in it, a narrow gap of
              the section's own colour between ring and photograph.
            */}
            <div
              data-reveal="pop"
              className="rounded-full bg-[conic-gradient(from_200deg,var(--color-red)_0_13%,rgb(245_242_236/0.16)_13%_100%)] p-px"
            >
              <div className="rounded-full bg-[#191919] p-[5px]">
                <div className="relative h-28 w-28 overflow-hidden rounded-full bg-[#242424] sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                  <div className="absolute" style={crop}>
                    <Image
                      src={portrait.src}
                      alt={copy.portraitAlt}
                      fill
                      sizes="(min-width: 1024px) 234px, (min-width: 640px) 208px, 182px"
                      quality={90}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h2
              id="about-title"
              data-reveal="up"
              data-rd="1"
              className="mt-6 text-[1.625rem] leading-tight font-semibold tracking-[-0.025em] text-paper sm:mt-7 sm:text-[1.875rem]"
            >
              {copy.name}
            </h2>
          </div>

          {/* Biography ----------------------------------------------------- */}
          <div className="mx-auto w-full max-w-[40rem] lg:mx-0 lg:pt-1">
            <p
              data-reveal="up"
              data-rd="2"
              className="font-prose text-[1.125rem] leading-[1.65] font-[450] tracking-[-0.011em] text-pretty text-paper sm:text-[1.1875rem]"
            >
              {lead}
            </p>

            <div className="mt-6 space-y-5 border-t border-line-invert-soft pt-6">
              {rest.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 20)}`}
                  data-reveal="up"
                  data-rd={String(index + 3)}
                  className="font-prose text-base leading-[1.72] tracking-[-0.006em] text-pretty text-paper/[0.64] sm:text-[1.0625rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
