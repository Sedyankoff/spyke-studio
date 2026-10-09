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
│   ├── [locale]/         # layout, page, opengraph-image — one route per locale
│   ├── global-not-found.tsx  # the bilingual 404 for any unmatched URL
│   ├── fonts.ts          # next/font setup shared by both documents
│   ├── globals.css       # tokens, type scale, hero and portrait grading, reveal system
│   └── robots.ts · sitemap.ts · manifest.ts · favicon.ico · icon.png · apple-icon.png
├── components/
│   ├── brand/            # SpykeLogo / SpykeMark — the real logo artwork, never type
│   ├── command/          # header, full-screen nav panel, nav previews, scroll spy
│   ├── layout/           # Section shell, Footer
│   ├── providers/        # LazyMotion config, RevealObserver
│   ├── sections/         # one component per page section, in page order
│   ├── ui/               # ButtonLink, Container, SectionIntro, Tag, icons…
│   └── work/             # project showcase: monitor, phone, live preview, project details
├── content/              # all copy and data (see below)
├── i18n/                 # locale list and helpers
└── lib/                  # cn(), JSON-LD
```

Page order: **Hero → About → Stack → Work → Experience → Footer.**

### Conventions

- **All copy lives in `src/content/locales/{bg,en}.ts`**, typed by `content/dictionary.ts`.
  Structural data — projects, stack groups, CV dates — lives beside it in `content/*.ts` and is
  locale-independent. Components render whatever those files contain; changing a project, a
  technology or a date never touches JSX.
- Typography is a small set of classes in `globals.css` — `.display-hero`, `.display-section`,
  `.eyebrow`, `.meta`, `.body-lg`, `.body-base`. Use them instead of inventing new text
  treatments.
- Colours are tokens under `@theme` in `globals.css`. `--color-red` is sampled from the logo
  artwork; `--color-line*` are the only border colours. Red is an accent, not a surface.
- Client components are kept to what needs state or the DOM: the header and nav panel (with
  their context), the language switch, the work section and its devices, and the motion and
  reveal providers. Every section is otherwise server-rendered.

### Motion

- **Entrance** (hero only) is CSS keyframes — `.animate-rise`, `.animate-fade` — staggered with
  `[animation-delay:*]`.
- **Scroll reveals** are opt-in: add `data-reveal="up|fade|line|line-y|scale"` and an optional
  `data-rd="1..6"` for a stagger step. A single `RevealObserver` in the layout marks
  everything still below the fold with `.is-out` and removes it as elements arrive, so the page
  is complete without JavaScript and nothing is hidden by the stylesheet alone.
- **Framer Motion** is reserved for what CSS cannot do: the nav panel, the rolling section
  label, the project window, the phone's screen and the project details transition. Components import `m` (not `motion`)
  because `LazyMotion` runs in strict mode.
- Scrolling is native. `prefers-reduced-motion` disables the reveal offsets and flattens every
  transition and animation.

## Brand assets

| File                                        | Use                                                      |
| ------------------------------------------- | -------------------------------------------------------- |
| `public/images/logo.png`                    | Original supplied lockup (white on a black plate)        |
| `public/images/logo-paper.png`              | Light lockup, plate removed — for ink surfaces           |
| `public/images/logo-ink.png`                | Dark lockup, plate removed — for paper surfaces          |
| `public/images/icons/spyke-studio-icon.png` | App icon (S and arrow on a black disc), the compact mark |

Render them through `SpykeLogo` / `SpykeMark` (declared in `brandAssets`, `content/site.ts`).
**Never set the wordmark in type** — the logo is a brand asset, not a text style.

These icon files are the app icon resized; regenerate them from `spyke-studio-icon.png` if it
changes:

| File                                                     | Use                            |
| -------------------------------------------------------- | ------------------------------ |
| `src/app/favicon.ico`                                    | 16 / 32 / 48 px, disc only     |
| `src/app/icon.png`                                       | 192 px browser icon, disc only |
| `src/app/apple-icon.png`                                 | 180 px Apple touch icon        |
| `public/images/icons/spyke-studio-icon-192.png` / `-512` | Web app manifest icons         |

## Images

| File                                      | Content                               |
| ----------------------------------------- | ------------------------------------- |
| `public/images/hero.webp`                 | Hero photograph, 1080×1440            |
| `public/images/StoilSedyankov.png`        | About portrait, cut-out on alpha      |
| `public/images/projects/<project>/*.webp` | Project screenshots, desktop + mobile |

Screenshots are WebP; `next/image` serves AVIF/WebP variants from them. Each project in
`content/projects.ts` lists **screens**, and every screen pairs a desktop and a mobile capture of
the same page (`*-desktop.webp` / `*-mobile.webp`) with their intrinsic sizes. The monitor shows
the desktop capture and the phone the mobile one, so the two always move together. Desktop
captures are a full-HD browser viewport (about 2:1); the browser toolbar inside the monitor keeps
the content area close to that ratio.

### Live previews

A project with an `embedUrl` (GNC Bulgaria, Bookapart) opens on its running site, framed inside
the monitor, on desktop pointers at 768px and wider. At build time `lib/embed.ts` reads the
site's `X-Frame-Options` / CSP `frame-ancestors`; if framing is refused, or the frame does not
load within 20 seconds, the project quietly falls back to its screenshots. The frame sits over
the first screenshot, so a slow site never shows a blank screen. A project with a `url` also gets
a "Visit live site" link that opens it in a new tab.

## Content the site asserts

Everything is sourced from real projects. Before publishing, confirm:

| What                                 | Where                         |
| ------------------------------------ | ----------------------------- |
| Name, role, email, location, socials | `src/content/site.ts`         |
| Production domain                    | `src/content/site.ts` → `url` |
| About copy, facts, languages         | `src/content/locales/*.ts`    |
| Stack groups and capabilities        | `src/content/stack.ts`        |
| Projects, tech, live URLs, images    | `src/content/projects.ts`     |
| Work history and education dates     | `src/content/cv.ts`           |

## SEO

Metadata lives in `src/app/[locale]/layout.tsx`, fed by `siteConfig` and the locale dictionary.
`robots.ts`, `sitemap.ts`, `manifest.ts` and `[locale]/opengraph-image.tsx` are generated routes;
JSON-LD (Person / WebSite) is built in `src/lib/structured-data.ts`. Every absolute URL —
canonical, `hreflang`, sitemap, Open Graph — derives from `siteConfig.url`
(`https://spykedev.com`).

## Deployment (Vercel)

The project deploys on Vercel with the defaults: framework preset **Next.js**, build command
`npm run build`, no custom output directory, server or Docker. **No environment variables are
required** — the site has no secrets, API keys or runtime services. Both locales, the OG images,
icons, robots and sitemap are prerendered at build time; the build also makes one `HEAD` request
to each `embedUrl` to check whether it may be framed.

Domain: add `spykedev.com` (and `www.spykedev.com`, redirecting to the apex) to the Vercel
project, then set the Cloudflare DNS records to the values Vercel shows. Keep those records
**DNS only** (grey cloud) unless you deliberately want Cloudflare's proxy in front of Vercel.
Vercel marks preview deployments `noindex`, so only the production domain is indexed.
