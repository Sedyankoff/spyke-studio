import type { Dictionary } from "@/content/dictionary";

export const en: Dictionary = {
  meta: {
    title: "Spyke Studio — Stoil Sedyankov, software engineer",
    description:
      "Spyke Studio is the personal software studio of Stoil Sedyankov. Digital products designed and built from the ground up with TypeScript, .NET, Go and Azure.",
    keywords: [
      "Spyke Studio",
      "Stoil Sedyankov",
      "software engineer",
      "web development",
      "Next.js",
      "TypeScript",
      "ASP.NET Core",
      "Go",
      "Azure",
      "Bulgaria",
    ],
    ogAlt: "Spyke Studio — Stoil Sedyankov, software engineer",
  },
  common: {
    present: "present",
    skipToContent: "Skip to content",
    backToTop: "Back to top",
    close: "Close",
    languageLabel: "Language",
    switchLanguage: "Превключи на български",
  },
  nav: {
    label: "Main navigation",
    open: "Open navigation",
    close: "Close navigation",
    sectionsLabel: "Sections",
    previewLabel: "Preview",
    items: {
      about: { label: "About", hint: "Stoil Sedyankov" },
      stack: { label: "Stack", hint: "Technologies" },
      work: { label: "Work", hint: "Selected products" },
      experience: { label: "Experience", hint: "Professional path" },
      education: { label: "Education", hint: "And additional information" },
      contact: { label: "Contact", hint: "Let's talk" },
    },
  },
  hero: {
    eyebrow: "Software studio",
    role: "Stoil Sedyankov — software engineer",
    statement: "Digital products designed and built from the ground up.",
    lead: "Commerce platforms, web applications and real-time systems.",
    primaryCta: "Explore projects",
    secondaryCta: "Get in touch",
    scroll: "Scroll",
  },
  about: {
    eyebrow: "About",
    name: "Stoil Sedyankov",
    role: "Software Engineer",
    studio: "Spyke Studio",
    paragraphs: [
      "I design and build software end to end — the interface, the API, the data model and the infrastructure they run on.",
      "Spyke Studio is the name I work under. It isn't an agency: one engineer taking a product from the data model to production. Spyke Commerce, the GNC Bulgaria storefront, BookApart and Spyke Arbix were all built this way.",
      "TypeScript and React on the front, ASP.NET Core and Go on the back, SQL Server and PostgreSQL underneath, Azure around all of it. I maintain what I ship.",
    ],
    factsLabel: "Profile",
    facts: [
      { label: "Based in", value: "Bulgaria" },
      { label: "Focus", value: "Full-stack product engineering" },
      { label: "Core stack", value: "TypeScript · .NET · Go" },
      { label: "Studio", value: "Spyke Studio, since 2024" },
    ],
    portraitAlt: "Portrait of Stoil Sedyankov",
  },
  stack: {
    eyebrow: "Stack",
    title: "Core stack",
    lead: "The technologies I work with day to day. Libraries specific to a single product stay with that project.",
    groups: {
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend",
      data: "Data",
      cloud: "Cloud & infrastructure",
    },
    capabilitiesTitle: "Engineering",
    capabilities: {
      rest: "REST APIs",
      websockets: "WebSockets",
      auth: "Authentication & roles",
      multitenancy: "Multi-tenant architecture",
      realtime: "Real-time systems",
      integrations: "External API integrations",
      cicd: "CI/CD",
    },
  },
  work: {
    eyebrow: "Work",
    title: "Selected projects",
    lead: "Four systems built at Spyke Studio — a commerce platform, the storefronts running on it, and a real-time backend.",
    open: "Open project",
    viewCase: "View project",
    closeProject: "Close project",
    indexLabel: "Project",
    categoryLabel: "Category",
    roleLabel: "Role",
    statusLabel: "Status",
    techLabel: "Technologies",
    overviewLabel: "Overview",
    liveLabel: "Live site",
    galleryLabel: "Gallery",
    previousImage: "Previous image",
    nextImage: "Next image",
    dataPathLabel: "Data path",
    dataPath: [
      "External APIs",
      "Go services",
      "NATS JetStream",
      "Event processing",
      "PostgreSQL · Redis",
      "WebSocket clients",
    ],
    projects: {
      "spyke-commerce": {
        name: "Spyke Commerce",
        category: "Commerce platform",
        status: "In production",
        roles: ["Architecture", "Development", "Infrastructure"],
        summary: "Multi-tenant commerce platform and admin.",
        description:
          "The platform every Spyke Studio storefront runs on. One admin covers catalog, categories, promotions and promo codes, content and blog pages, policy pages, orders, reviews and users, alongside a real-time dashboard for sessions, revenue, conversion rate, average order value and traffic sources. Multi-tenant, role-based and bilingual.",
        images: {
          dashboard: {
            label: "Dashboard",
            alt: "Spyke Commerce analytics dashboard showing users, sessions, conversion rate, revenue and a traffic versus revenue chart",
          },
          signin: {
            label: "Sign in",
            alt: "Spyke Commerce workspace sign-in screen",
          },
          products: {
            label: "Products",
            alt: "Spyke Commerce product management on mobile, listing 161 products with search and bulk edit",
          },
        },
      },
      "gnc-bulgaria": {
        name: "GNC Bulgaria",
        category: "Storefront",
        status: "Shipped",
        roles: ["Development", "Integrations", "Deployment"],
        summary: "The official GNC storefront for the Bulgarian market.",
        description:
          "A full storefront built on Spyke Commerce: a 161-product catalog with search and category navigation, campaigns, promotions and a news section. Every price is shown in both EUR and BGN at the official rate for Bulgaria's euro transition, and the site runs in Bulgarian and English.",
        images: {
          storefront: {
            label: "Storefront",
            alt: "GNC Bulgaria homepage with dual-currency pricing, category navigation and a Total Lean campaign banner",
          },
          news: {
            label: "News",
            alt: "GNC Bulgaria news section on mobile",
          },
        },
      },
      bookapart: {
        name: "BookApart",
        category: "Product site",
        status: "Shipped",
        roles: ["Design", "Development", "Content"],
        summary: "Curated stays in the Rhodope mountains.",
        description:
          "Apartments, studios and guest houses across four Rhodope destinations. Stays filter instantly on the client, guests contact owners directly, and an interactive map plots twenty local landmarks. Content is authored in MDX and the site is bilingual.",
        images: {
          home: {
            label: "Home",
            alt: "BookApart homepage over an aerial view of a Rhodope village, with headline and statistics",
          },
          stays: {
            label: "Stays",
            alt: "BookApart stays listing with filters for studios, one-bedroom and two-bedroom apartments",
          },
          landmarks: {
            label: "Landmarks",
            alt: "BookApart landmarks map with clustered photo markers",
          },
          mobile: {
            label: "Mobile",
            alt: "BookApart homepage on mobile",
          },
        },
      },
      "spyke-arbix": {
        name: "Spyke Arbix",
        category: "Real-time system",
        status: "In development",
        roles: ["Architecture", "Backend", "Infrastructure"],
        summary: "Real-time data ingestion and event processing.",
        description:
          "A distributed system with a Go backend and a React front end. Data is collected from external APIs, published as events through NATS JetStream, processed, cached in Redis and persisted in PostgreSQL, then pushed to connected clients over WebSockets. Every service runs in Docker.",
        images: {},
      },
    },
  },
  experience: {
    eyebrow: "Experience",
    title: "Professional experience",
    professional: "Professional path",
    entries: {
      "spyke-studio": {
        role: "Founder & Software Engineer",
        company: "Spyke Studio",
        summary:
          "Personal software studio. Architecture, development, deployment and maintenance for every product of the studio, including Spyke Commerce — the multi-tenant platform the storefronts run on.",
        tags: ["Architecture", "Full-stack", "Delivery"],
      },
      gnc: {
        role: "Software Engineer",
        company: "GNC Bulgaria · via Spyke Studio",
        summary:
          "Built and shipped the official GNC storefront for Bulgaria on Spyke Commerce: a 161-product catalog, dual EUR/BGN pricing, campaigns, a news section and a bilingual content system.",
        tags: ["E-commerce", "Localisation", "Production"],
      },
      freelance: {
        role: "Freelance Full-stack Developer",
        company: "Independent",
        summary:
          "Websites and web applications for clients — interfaces, APIs, database design and deployment.",
        tags: ["Client work", "Web apps"],
      },
    },
  },
  education: {
    eyebrow: "Education",
    title: "Education",
    academic: "Academic path",
    additional: "Additional information",
    entries: {
      plovdiv: {
        degree: "B.Sc. Software Engineering",
        institution: "Plovdiv University “Paisii Hilendarski”",
        summary:
          "Computer science fundamentals — algorithms and data structures, databases, operating systems and software architecture.",
        focus: ["Algorithms", "Databases", "Software architecture"],
      },
    },
    languagesLabel: "Languages",
    languages: [{ name: "Bulgarian", level: "Native" }, { name: "English" }],
    licenceLabel: "Driving licence",
    licenceValue: "Category B",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk",
    lead: "Available for contract work, and happy to talk through an idea before there is a brief. Email is the fastest way to reach me.",
    emailLabel: "Email",
    copyEmail: "Copy email address",
    emailCopied: "Email address copied",
    elsewhereLabel: "Elsewhere",
    availability: "Open to new projects · Bulgaria",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      message: "Message",
      messagePlaceholder: "What are you building?",
      submit: "Send message",
      note: "Opens your email client — nothing is stored or tracked.",
      subject: "Enquiry from",
      opening: "Opening your mail app…",
    },
  },
  footer: {
    tagline: "The personal software studio of Stoil Sedyankov. Bulgaria.",
    rights: "All rights reserved.",
    builtBy: "Designed and built by Stoil Sedyankov",
  },
};
