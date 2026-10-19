import type { Dictionary } from "@/content/dictionary";

export const en: Dictionary = {
  meta: {
    title: "Spyke Studio | Stoil Sedyankov",
    description:
      "Spyke Studio — Stoil Sedyankov, Plovdiv, Bulgaria. Web applications with C#/.NET and React/TypeScript: backend, frontend, REST APIs, databases and integrations.",
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
    statement: "Digital products built from scratch.",
    statementLines: [
      ["Digital", "products,"],
      ["built from", "scratch."],
    ],
    lead: "From the first idea to a working product — with attention to every detail.",
    primaryCta: "View Projects",
    secondaryCta: "Get in Touch",
  },
  about: {
    eyebrow: "About",
    name: "Stoil Sedyankov",
    role: "Software Engineer",
    paragraphs: [
      "I’ve been programming for over four years. I build web applications across the backend and the frontend, from databases and integrations to the infrastructure they run on.",
      "Outside my main job, I work on my own projects and build solutions for clients. I like starting from an idea and carrying it all the way to a product that works, and my own projects are where I try out new technologies and approaches.",
      "Spyke Studio grew out of Spyke Commerce, the e-commerce platform I built on my own for GNC Bulgaria. That project gave me the confidence to start offering my services independently.",
    ],
    portraitAlt: "Portrait of Stoil Sedyankov",
  },
  stack: {
    eyebrow: "Stack",
    title: "Technologies",
    lead: "",
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
    capabilitiesTitle: "Other areas",
    capabilities: {
      rest: "REST APIs",
      integrations: "External API integrations",
      cicd: "CI/CD",
    },
  },
  work: {
    eyebrow: "Work",
    title: "Selected projects",
    lead: "",
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
            alt: "Spyke Commerce admin panel",
          },
          "product-edit": {
            label: "Edit product",
            alt: "Spyke Commerce product editor",
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
          "The official GNC online store for Bulgaria, built on Spyke Commerce.",
        screens: {
          home: {
            label: "Home",
            alt: "GNC Bulgaria homepage",
          },
          category: {
            label: "Category",
            alt: "GNC Bulgaria category page",
          },
          product: {
            label: "Product",
            alt: "GNC Bulgaria product page",
          },
        },
      },
      bookapart: {
        name: "Bookapart",
        description:
          "A site for finding apartments, studios and guest houses in the Rhodope mountains. Users contact hosts directly and explore nearby landmarks.",
        screens: {
          home: {
            label: "Home",
            alt: "Bookapart homepage",
          },
          places: {
            label: "Stays",
            alt: "Bookapart list of stays",
          },
          place: {
            label: "Stay",
            alt: "Bookapart page for a single apartment ",
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
    tagline: "",
    rights: "All rights reserved.",
    builtBy: "",
  },
};
