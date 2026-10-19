import type { Dictionary } from "@/content/dictionary";

export const bg: Dictionary = {
  meta: {
    title: "Spyke Studio | Stoil Sedyankov",
    description:
      "Spyke Studio — Стоил Седянков, Пловдив. Уеб приложения със C#/.NET и React/TypeScript: backend, frontend, REST API, бази данни и интеграции.",
    keywords: [
      "Стоил Седянков",
      "софтуерен инженер",
      "C#",
      ".NET",
      "ASP.NET Core",
      "React",
      "TypeScript",
      "Пловдив",
      "България",
      "Spyke Studio",
    ],
  },
  common: {
    present: "настоящем",
    skipToContent: "Към съдържанието",
    backToTop: "Нагоре",
    close: "Затвори",
    switchLanguage: "Switch to English",
    notFound: "Тази страница не съществува.",
    home: "Към началото",
    months: ["ян.", "февр.", "март", "апр.", "май", "юни", "юли", "авг.", "септ.", "окт.", "ноем.", "дек."],
  },
  nav: {
    label: "Основна навигация",
    open: "Отвори навигацията",
    close: "Затвори навигацията",
    sectionsLabel: "Секции",
    items: {
      about: { label: "За мен", hint: "Стоил Седянков" },
      stack: { label: "Стек", hint: "Технологии" },
      work: { label: "Проекти", hint: "Избрани продукти" },
      experience: { label: "Опит", hint: "Професионален път" },
    },
  },
  hero: {
    statement: "Дигитални продукти, разработени от нулата.",
    statementLines: [
      ["Дигитални", "продукти,"],
      ["разработени", "от нулата."],
    ],
    lead: "От първата идея до реално работещ продукт — с внимание към всеки детайл.",
    primaryCta: "Разгледай проектите",
    secondaryCta: "Свържи се",
  },
  about: {
    eyebrow: "За мен",
    name: "Стоил Седянков",
    role: "Софтуерен инженер",
    paragraphs: [
      "Програмирам от над четири години. Разработвам уеб приложения както в backend, така и във frontend частта – от базите данни и интеграциите до инфраструктурата, на която работят.",
      "Извън основната си работа развивам собствени проекти и изграждам решения за клиенти. Обичам да започна от идея и да я доведа до работещ продукт, а собствените ми проекти са мястото, където изпробвам нови технологии и подходи.",
      "Spyke Studio се роди от Spyke Commerce – e-commerce платформата, която разработих сам за GNC България. Този проект ми даде увереността да започна да предлагам услугите си самостоятелно.",
    ],
    portraitAlt: "Портрет на Стоил Седянков",
  },
  stack: {
    eyebrow: "Стек",
    title: "Технологии",
    lead: "",
    groups: {
      languages: "Езици",
      frontend: "Фронтенд",
      backend: "Бекенд",
      data: "Бази данни",
      cloud: "Облак и инфраструктура",
      delivery: "CI/CD и инструменти",
      realtime: "Реално време и разпределени системи",
    },
    primaryLabel: "Основен",
    capabilitiesTitle: "Други направления",
    capabilities: {
      rest: "REST API",
      integrations: "Интеграции с външни API",
      cicd: "CI/CD",
    },
  },
  work: {
    eyebrow: "Проекти",
    title: "Избрани проекти",
    lead: "",
    open: "Покажи проекта",
    workstationLabel: "Работна станция на Spyke Studio",
    liveView: "На живо",
    liveLoading: "Зареждане на сайта…",
    visitSite: "Отвори проекта",
    newTab: "отваря се в нов раздел",
    mobileView: "мобилна версия",
    previousImage: "Предишен екран",
    nextImage: "Следващ екран",
    techLabel: "Технологии",
    projects: {
      "spyke-commerce": {
        name: "Spyke Commerce",
        description:
          "Платформата, върху която работят онлайн магазините на Spyke Studio. Собствениците управляват продукти, поръчки, промоции и съдържание от един административен панел и следят продажбите и трафика в реално време.",
        screens: {
          products: {
            label: "Продукти",
            alt: "Административен панел на Spyke Commerce",
          },
          "product-edit": {
            label: "Редакция на продукт",
            alt: "Редакция на продукт в Spyke Commerce",
          },
          login: {
            label: "Вход",
            alt: "Екран за вход в Spyke Commerce",
          },
        },
      },
      "gnc-bulgaria": {
        name: "GNC България",
        description:
          "Официалният онлайн магазин на GNC за България, изграден върху Spyke Commerce.",
        screens: {
          home: {
            label: "Начало",
            alt: "Начална страница на GNC България",
          },
          category: {
            label: "Категория",
            alt: "Страница с категория в GNC България с продукти, филтри и сортиране",
          },
          product: {
            label: "Продукт",
            alt: "Продуктова страница в GNC България",
          },
        },
      },
      bookapart: {
        name: "Bookapart",
        description:
          "Сайт за апартаменти, студиа и къщи за гости в Родопите. Потребителите се свързват директно със собствениците и могат да открият интересни забележителности наблизо.",
        screens: {
          home: {
            label: "Начало",
            alt: "Начална страница на Bookapart",
          },
          places: {
            label: "Места",
            alt: "Списък с места за настаняване в Bookapart с филтри за студиа и апартаменти",
          },
          place: {
            label: "Място",
            alt: "Страница на апартамент в Bookapart с оценка, локация и галерия",
          },
          landmarks: {
            label: "Забележителности",
            alt: "Карта на забележителностите в Родопите в Bookapart",
          },
        },
      },
    },
  },
  experience: {
    eyebrow: "Опит",
    title: "Професионален опит",
    areasLabel: "Области на работа",
    entries: {
      orak: {
        role: "Програмист/разработчик на софтуерни приложения",
        company: "Orak Engineering EOOD",
        location: "Пловдив, България",
        summary:
          "Разработване и поддържане на уеб приложения със C#/.NET и React/TypeScript.",
        tags: [
          "C# / .NET",
          "ASP.NET Core",
          "React",
          "TypeScript",
          "SQL Server",
        ],
      },
      skai: {
        role: "Стажант програмист – C#/.NET",
        company: "SKAI VIU LTD",
        location: "Смолян, България",
        summary: "Стаж в областта на разработката със C#/.NET.",
        tags: [],
      },
    },
  },
  footer: {
    owner: "Стоил Седянков",
    tagline: "",
    rights: "Всички права запазени.",
    builtBy: "",
  },
};
