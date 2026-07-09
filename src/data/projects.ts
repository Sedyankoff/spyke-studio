import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "spyke-commerce",
    name: "Spyke Commerce",
    tagline: "A multi-tenant commerce engine built to run real stores.",
    domain: "commerce.spyke.studio",
    year: "2024 — Present",
    status: "In production",
    role: "Founder · Architecture & Full-stack",
    description:
      "The platform behind Spyke Studio's client storefronts — a complete commerce backend with catalog, promotions, content, orders, reviews and user management, paired with a real-time analytics dashboard that turns store traffic into decisions.",
    challenge:
      "One codebase had to serve multiple brands with different catalogs, languages and teams — without collapsing into a tangle of special cases.",
    solution:
      "A multi-tenant domain model with role-based admin access, an i18n-first content layer and an analytics pipeline that aggregates sessions, orders and revenue in real time.",
    highlights: [
      "Real-time commerce analytics",
      "Catalog, promotion & content tooling",
      "Role-based multi-user admin",
      "Bilingual by design (BG / EN)",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    images: {
      desktop: {
        src: "/images/projects/spyke-commerce-desktop.jpg",
        alt: "Spyke Commerce analytics dashboard with revenue, sessions and traffic-source charts",
        width: 1600,
        height: 1000,
      },
      phone: {
        src: "/images/projects/spyke-commerce-phone.jpg",
        alt: "Spyke Commerce product management on mobile",
        width: 800,
        height: 1732,
      },
    },
    theme: {
      primary: "rgba(229, 72, 77, 0.13)",
      secondary: "rgba(125, 125, 140, 0.09)",
    },
  },
  {
    id: "gnc-bulgaria",
    name: "GNC Bulgaria",
    tagline: "The official GNC storefront for the Bulgarian market.",
    domain: "gnc.bg",
    year: "2025",
    status: "Live",
    role: "Lead Engineer · Spyke Studio",
    description:
      "A full e-commerce storefront for one of the world's best-known supplement brands — 160+ products, campaign merchandising, blog and promotions, running on Spyke Commerce and localised for the Bulgarian market in two languages.",
    challenge:
      "Launching during Bulgaria's euro transition meant every price had to be legally displayed in two currencies, kept perfectly in sync at the statutory rate.",
    solution:
      "A currency engine renders dual EUR/BGN pricing across catalog, cart and checkout, while the storefront stays fast under image-heavy category pages.",
    highlights: [
      "Dual-currency pricing (EUR / BGN)",
      "160+ product catalog with search & filters",
      "Campaign & promotion merchandising",
      "Fully bilingual storefront",
    ],
    stack: ["Next.js", "TypeScript", "Spyke Commerce", "PostgreSQL"],
    images: {
      desktop: {
        src: "/images/projects/gnc-desktop.jpg",
        alt: "GNC Bulgaria storefront homepage with campaign banner and category navigation",
        width: 1600,
        height: 1000,
      },
      phone: {
        src: "/images/projects/gnc-phone.jpg",
        alt: "GNC Bulgaria news feed on mobile",
        width: 800,
        height: 1732,
      },
    },
    theme: {
      primary: "rgba(227, 6, 19, 0.1)",
      secondary: "rgba(41, 182, 216, 0.1)",
    },
  },
  {
    id: "bookapart",
    name: "BookApart",
    tagline: "A curated booking experience for the Rhodope mountains.",
    domain: "bookapart.bg",
    year: "2025",
    status: "Live",
    role: "Design & Engineering",
    description:
      "Not another listing aggregator — a hand-picked collection of apartments, studios and guest houses in the Rhodopes, with honest reviews, direct owner contact and an interactive map of twenty local landmarks that helps guests plan the whole trip.",
    challenge:
      "Booking platforms feel transactional. BookApart had to feel editorial — trustworthy, calm and local — while keeping filtering and discovery effortless.",
    solution:
      "A content-first design system, instant client-side filtering by stay type, and a Leaflet-powered attractions map with clustered, photo-rich markers.",
    highlights: [
      "Interactive landmark map (20 POIs)",
      "Instant stay filtering",
      "Direct-contact booking model",
      "Bilingual (BG / EN)",
    ],
    stack: ["Next.js", "TypeScript", "Leaflet", "Tailwind CSS"],
    images: {
      desktop: {
        src: "/images/projects/bookapart-desktop.jpg",
        alt: "BookApart homepage hero over an aerial Rhodope forest with stay statistics",
        width: 1600,
        height: 1000,
      },
      phone: {
        src: "/images/projects/bookapart-phone.jpg",
        alt: "BookApart mobile homepage with curated stays",
        width: 800,
        height: 1732,
      },
    },
    theme: {
      primary: "rgba(122, 162, 92, 0.13)",
      secondary: "rgba(58, 90, 43, 0.11)",
    },
  },
];
