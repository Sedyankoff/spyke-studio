import type { Principle } from "@/types";

export const philosophyStatement =
  "Good software is opinionated about quality and humble about everything else.";

export const principles: Principle[] = [
  {
    title: "Architecture before aesthetics",
    description:
      "Every product starts as a system. Get the boundaries, the data flow and the naming right, and the interface almost designs itself.",
  },
  {
    title: "Performance is design",
    description:
      "Speed is the first thing users feel and the last thing they forgive. Milliseconds are a design material, the same as colour or type.",
  },
  {
    title: "Details compound",
    description:
      "A rounded corner, a well-timed easing, a precise error message — individually invisible, together the entire difference between good and premium.",
  },
  {
    title: "Code is read, not written",
    description:
      "Software is written once and read for years. Clarity beats cleverness every single time someone else — including future me — opens the file.",
  },
  {
    title: "Scale quietly",
    description:
      "Proven tools, boring infrastructure, no heroics. The best systems grow without anyone noticing they had to.",
  },
  {
    title: "Value over novelty",
    description:
      "Technology serves the product, not the résumé. Every feature has to move a number that matters — or it doesn't ship.",
  },
];
