# Spyke Studio — Flagship Website

The personal portfolio, CV and brand site of **Stoil Sedyankov / Spyke Studio** — a single-page
production site built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion
and Lenis.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run format     # prettier (with tailwind class sorting)
```

## Architecture

```
src/
├── app/                  # App Router: layout, page, SEO files (robots, sitemap, manifest), 404
├── components/
│   ├── animations/       # Reveal, Stagger, Parallax, Tilt — the shared motion vocabulary
│   ├── layout/           # Navbar (floating pill + mobile menu), Footer, Section shell
│   ├── providers/        # Lenis smooth scroll, active-section context, LazyMotion config
│   ├── sections/         # One component per page section, in page order
│   └── ui/               # Logo, Button, Badge, frames, timeline… reusable primitives
├── constants/            # Site identity (site.ts) and navigation model
├── data/                 # All page content as typed data — edit copy here, not in components
├── hooks/                # use-section-spy, use-media-query
├── lib/                  # cn(), motion presets, JSON-LD builders
└── types/                # Shared content types
```

Conventions worth knowing:

- **All copy and facts live in `src/data/*` and `src/constants/site.ts`.** Components render
  whatever those files contain — changing a project, a skill or a date never touches JSX.
- Motion uses `LazyMotion` in strict mode, so components import `m` (not `motion`) from
  framer-motion. Easing/variants presets live in `src/lib/motion.ts`.
- The site is dark-only by design; brand tokens are defined in `src/app/globals.css` under
  `@theme` (`--color-accent` is the Spyke red).
- Animations respect `prefers-reduced-motion` (Framer via `MotionConfig`, Lenis is not
  initialised, scroll-linked transforms are disabled).

## Content checklist before going live

Everything inferred during the build is centralised so it can be corrected in minutes:

| What                          | Where                                        |
| ----------------------------- | -------------------------------------------- |
| Name, role, email, location   | `src/constants/site.ts` → `siteConfig`       |
| Production domain             | `src/constants/site.ts` → `url`              |
| Social profile URLs           | `src/constants/site.ts` → `socialLinks`      |
| Journey timeline + years      | `src/data/journey.ts`                        |
| Work history + dates          | `src/data/experience.ts`                     |
| University name + dates       | `src/data/education.ts`                      |
| Project copy, stacks, domains | `src/data/projects.ts`                       |
| Live project links            | `src/data/projects.ts` → `links.live`        |

## Replacing the generated artwork

The images in `public/images` are branded stand-ins rendered from vector art. Replace them with
real photography/screenshots **keeping the same file names and aspect ratios**:

| File                                            | Content                        | Size       |
| ----------------------------------------------- | ------------------------------ | ---------- |
| `public/images/portrait.jpg`                    | Hero portrait                  | 1200×1500  |
| `public/images/projects/spyke-commerce-desktop.jpg` | Admin dashboard screenshot | 1600×1000  |
| `public/images/projects/spyke-commerce-phone.jpg`   | Admin mobile screenshot    | 800×1732   |
| `public/images/projects/gnc-desktop.jpg`        | GNC storefront screenshot      | 1600×1000  |
| `public/images/projects/gnc-phone.jpg`          | GNC mobile screenshot          | 800×1732   |
| `public/images/projects/bookapart-desktop.jpg`  | BookApart home screenshot      | 1600×1000  |
| `public/images/projects/bookapart-phone.jpg`    | BookApart mobile screenshot    | 800×1732   |
| `public/images/og.jpg`                          | Social share image             | 1200×630   |
| `public/images/icons/icon-192.png` / `icon-512.png` | PWA icons                 | 192 / 512  |
| `src/app/apple-icon.png`                        | Apple touch icon               | 180×180    |

The in-page logo is an SVG lockup (`src/components/ui/logo.tsx`) derived from the official
wordmark; swap its markup if you export the real logo as SVG.

## SEO

Metadata (OpenGraph, Twitter, canonical, robots directives) is defined in `src/app/layout.tsx`,
fed by `siteConfig`. `robots.ts`, `sitemap.ts` and `manifest.ts` are generated routes; JSON-LD
(Person / Organization / WebSite) is built in `src/lib/structured-data.ts`. Set the real domain
in `siteConfig.url` before deploying — every absolute URL derives from it.
