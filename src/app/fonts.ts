import { Inter, JetBrains_Mono, Oswald } from "next/font/google";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

/** Font variables for `<html>`; shared by the locale layout and the global 404. */
export const fontVariables = `${oswald.variable} ${inter.variable} ${jetbrains.variable}`;
