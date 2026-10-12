import type { Dictionary } from "@/content/dictionary";

export const en: Dictionary = {
  meta: {
    title: "Stoil Sedyankov — Software Engineer | Spyke Studio",
    description:
      "Stoil Sedyankov — software engineer in Plovdiv, Bulgaria. Web applications with C#/.NET and React/TypeScript: backend, frontend, REST APIs, databases and integrations.",
    keywords: [
      "Stoil Sedyankov",
      "software engineer",
      "C#",
      ".NET",
      "ASP.NET Core",
      "React",
      "TypeScript",
      "Plovdiv",
      "Bulgaria",
      "Spyke Studio",
    ],
  },
  common: {
    present: "present",
    skipToContent: "Skip to content",
    backToTop: "Back to top",
    close: "Close",
    switchLanguage: "Превключи на български",
    notFound: "This page doesn't exist.",
    home: "Back to home",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  nav: {
    label: "Main navigation",
    open: "Open navigation",
    close: "Close navigation",
    sectionsLabel: "Sections",
    items: {
      about: { label: "About", hint: "Stoil Sedyankov" },
      stack: { label: "Stack", hint: "Technologies" },
      work: { label: "Work", hint: "Selected products" },
      experience: { label: "Experience", hint: "Professional path" },
    },
  },
  hero: {
    statement: "Digital products, designed and built from scratch.",
    statementLines: ["Digital products,", "designed and built", "from scratch."],
    lead: "At Spyke Studio I design and build web applications and online stores — from the database to the interface.",
    primaryCta: "View Projects",
    secondaryCta: "Get in Touch",
  },
  about: {
    eyebrow: "About",
    name: "Stoil Sedyankov",
    role: "Software Engineer",
    paragraphs: [
      "Since May 2024 I've worked as a programmer at Orak Engineering EOOD, developing and maintaining web applications with C#/.NET and React/TypeScript.",
      "Most of my work is on REST APIs, databases and integrations with external services, and on the interfaces built on top of them.",
      "I'm studying Software Engineering at Plovdiv University “Paisii Hilendarski”. My first formal experience was a C#/.NET internship at SKAI VIU in summer 2022.",
    ],
    portraitAlt: "Portrait of Stoil Sedyankov",
  },
  stack: {
    eyebrow: "Stack",
    title: "Technologies",
    lead: "My primary stack is C#/.NET and React/TypeScript. Around it: databases, infrastructure, CI/CD and real-time systems.",
    groups: {
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend",
      data: "Databases",
      cloud: "Cloud & infrastructure",
      delivery: "CI/CD & tooling",
      realtime: "Real-time & distributed",
    },
    primaryLabel: "Primary",
    capabilitiesTitle: "Engineering",
    capabilities: {
      rest: "REST APIs",
      multitenancy: "Multi-tenant architecture",
      integrations: "External API integrations",
      realtime: "Real-time systems",
      cicd: "CI/CD",
    },
  },
  work: {
    eyebrow: "Work",
    title: "Selected projects",
    lead: "An e-commerce platform, an online store built on it, and a site for finding stays in the Rhodope mountains.",
    open: "Show project",
    workstationLabel: "Spyke Studio workstation",
    liveView: "Live",
    liveLoading: "Loading live site…",
    visitSite: "Visit project",
    newTab: "opens in a new tab",
    mobileView: "mobile view",
    previousImage: "Previous screen",
    nextImage: "Next screen",
    techLabel: "Technologies",
    projects: {
      "spyke-commerce": {
        name: "Spyke Commerce",
        description:
          "The platform behind Spyke Studio's online stores. Store owners manage products, orders, promotions and content from one admin panel, and follow sales and traffic on a live dashboard.",
        screens: {
          products: {
            label: "Products",
            alt: "Spyke Commerce admin panel listing products with search, filters and bulk editing",
          },
          "product-edit": {
            label: "Edit product",
            alt: "Spyke Commerce product editor with image upload and product details",
          },
          login: {
            label: "Sign in",
            alt: "Spyke Commerce workspace sign-in screen",
          },
        },
      },
      "gnc-bulgaria": {
        name: "GNC Bulgaria",
        description:
          "The official GNC online store for Bulgaria, built on Spyke Commerce. Shoppers browse supplements by category, search the catalog and see every price in both euro and leva.",
        screens: {
          home: {
            label: "Home",
            alt: "GNC Bulgaria homepage with category navigation and featured products",
          },
          category: {
            label: "Category",
            alt: "GNC Bulgaria category page with product cards, filters and sorting",
          },
          product: {
            label: "Product",
            alt: "GNC Bulgaria product page with an image gallery and the price in euro",
          },
        },
      },
      bookapart: {
        name: "Bookapart",
        description:
          "A site for finding apartments, studios and guest houses in the Rhodope mountains. Guests filter stays, view each place in detail, contact hosts directly and explore nearby landmarks on a map.",
        screens: {
          home: {
            label: "Home",
            alt: "Bookapart homepage over an aerial photo of the Rhodope mountains",
          },
          places: {
            label: "Stays",
            alt: "Bookapart list of stays with filters for studios and apartments",
          },
          place: {
            label: "Stay",
            alt: "Bookapart page for a single apartment with its rating, location and photo gallery",
          },
          landmarks: {
            label: "Landmarks",
            alt: "Bookapart map of landmarks in the Rhodope mountains",
          },
        },
      },
    },
  },
  experience: {
    eyebrow: "Experience",
    title: "Professional experience",
    areasLabel: "Areas of work",
    entries: {
      orak: {
        role: "Programmer/Developer, Software Applications",
        company: "Orak Engineering EOOD",
        location: "Plovdiv, Bulgaria",
        summary:
          "I develop and maintain web applications with C#/.NET on the backend and React/TypeScript on the frontend, and contribute to production software with real-time functionality and a multi-tenant architecture.",
        tags: [
          "C# / .NET",
          "ASP.NET Core",
          "React",
          "TypeScript",
          "SQL Server",
          "PostgreSQL",
        ],
        areas: [
          "REST APIs",
          "Databases (SQL Server, PostgreSQL) and Redis caching",
          "Authentication and role-based access",
          "External API integrations",
          "CI/CD (GitHub Actions)",
        ],
      },
      skai: {
        role: "C#/.NET Programmer Intern",
        company: "SKAI VIU LTD",
        location: "Smolyan, Bulgaria",
        summary: "A formal summer internship in C#/.NET software development.",
        tags: [],
      },
    },
  },
  footer: {
    owner: "Stoil Sedyankov",
    tagline: "Stoil Sedyankov — Software Engineer. Plovdiv, Bulgaria.",
    rights: "All rights reserved.",
    builtBy: "Designed and built by Stoil Sedyankov",
  },
};
