# Spyke Studio — personal portfolio & CV

The personal site of **Stoil Sedyankov**, published under the Spyke Studio identity. One page,
statically rendered in Bulgarian and English, built with Next.js 16 (App Router), TypeScript,
Tailwind CSS v4 and a deliberately small amount of Framer Motion.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /bg)
npm run build      # production build
npm run lint       # eslint
npm run format     # prettier (with tailwind class sorting)
```

## Structure

```
src/
├── app/
│   ├── [locale]/         # layout, page, opengraph-image, 404 — one route per locale
│   ├── globals.css       # tokens, type scale, hero masks, reveal system
│   └── robots.ts · sitemap.ts · manifest.ts · icon.svg · apple-icon.png
├── components/
│   ├── brand/            # SpykeLogo / SpykeMark — the real logo artwork, never type
│   ├── command/          # header, full-screen nav panel, nav previews, scroll spy
│   ├── layout/           # Section shell, Footer
│   ├── providers/        # LazyMotion config, RevealObserver
│   ├── sections/         # one component per page section, in page order
│   ├── ui/               # Button, Container, SectionIntro, Tag, icons…
│   └── work/             # project showcase, device frames, system diagram, detail view
├── content/              # all copy and data (see below)
├── i18n/                 # locale list and helpers
└── lib/                  # cn(), JSON-LD
```

Page order: **Hero → About → Stack → Work → Experience → Education → Contact → Footer.**

### Conventions

- **All copy lives in `src/content/locales/{bg,en}.ts`**, typed by `content/dictionary.ts`.
  Structural data — projects, stack groups, CV dates — lives beside it in `content/*.ts` and is
  locale-independent. Components render whatever those files contain; changing a project, a
  technology or a date never touches JSX.
- Typography is a small set of classes in `globals.css` — `.display-hero`, `.display-section`,
  `.display-statement`, `.display-card`, `.display-index`, `.eyebrow`, `.meta`, `.body-lg`,
  `.body-base`. Use them instead of inventing new text treatments.
- Colours are tokens under `@theme` in `globals.css`. `--color-red` is sampled from the logo
  artwork; `--color-line*` are the only border colours. Red is an accent, not a surface.
- Only four components are client components by necessity: the header, the nav panel, the work
  section (modal state) and the contact form. Everything else is server-rendered.

### Motion

- **Entrance** (hero only) is CSS keyframes — `.animate-rise`, `.animate-mask`, `.animate-field`,
  `.animate-settle`, `.animate-drop`, `.animate-grow` — staggered with `[animation-delay:*]`.
- **Scroll reveals** are opt-in: add `data-reveal="up|fade|mask|line|line-y|scale"` and an
  optional `data-rd="1..8"` for a stagger step. A single `RevealObserver` in the layout marks
  everything still below the fold with `.is-out` and removes it as elements arrive, so the page
  is complete without JavaScript and nothing is hidden by the stylesheet alone.
- **Framer Motion** is reserved for what CSS cannot do: the nav panel and its previews, the
  rolling section label, and the project detail transition. Components import `m` (not `motion`)
  because `LazyMotion` runs in strict mode.
- Scrolling is native. `prefers-reduced-motion` disables the reveal offsets and flattens every
  transition and animation.

## Brand assets

`public/images/logo.png` is the original supplied artwork — the white lockup on a solid black
plate. Three derived files carry the same artwork with the plate removed, and they are what the
site actually renders:

| File                           | Use                                   |
| ------------------------------ | ------------------------------------- |
| `public/images/logo-ink.png`   | Dark lockup, for paper surfaces       |
| `public/images/logo-paper.png` | Light lockup, for ink surfaces        |
| `public/images/logo-mark.png`  | The arrow alone, as a compact marker  |

Render them through `SpykeLogo` / `SpykeMark`. **Never set the wordmark in type** — the logo is a
brand asset, not a text style.

## Images

| File                                            | Content             | Size       |
| ----------------------------------------------- | ------------------- | ---------- |
| `public/images/hero.webp`                       | Hero photograph     | 1080×1440  |
| `public/images/projects/*.webp`                 | Project screenshots | ≤2560 wide |
| `public/images/icons/icon-192.png` / `-512.png` | PWA icons           | 192 / 512  |
| `src/app/apple-icon.png`                        | Apple touch icon    | 180×180    |

Screenshots are WebP; `next/image` serves AVIF/WebP variants from them. New captures should be
resized to at most 2560px wide and encoded as WebP before being committed. Each one is declared
in `content/projects.ts` with its intrinsic size and a `desktop` / `mobile` kind — desktop shots
go into a browser frame, mobile shots overlap its corner. A project with no images renders the
`SystemDiagram` from its `work.dataPath` copy instead.

## Content the site asserts

Everything is sourced from real projects. Before publishing, confirm:

| What                                 | Where                             |
| ------------------------------------ | --------------------------------- |
| Name, role, email, location, socials | `src/content/site.ts`             |
| Production domain                    | `src/content/site.ts` → `url`     |
| About copy, facts, languages         | `src/content/locales/*.ts`        |
| Stack groups and capabilities        | `src/content/stack.ts`            |
| Projects, tech, live URLs, images    | `src/content/projects.ts`         |
| Work history and education dates     | `src/content/cv.ts`               |

## SEO

Metadata lives in `src/app/[locale]/layout.tsx`, fed by `siteConfig` and the locale dictionary.
`robots.ts`, `sitemap.ts`, `manifest.ts` and `[locale]/opengraph-image.tsx` are generated routes;
JSON-LD (Person / Organization / WebSite) is built in `src/lib/structured-data.ts`. Set the real
domain in `siteConfig.url` before deploying — every absolute URL derives from it.
