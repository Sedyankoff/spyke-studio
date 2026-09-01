import { Footer } from "@/components/layout/footer";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";
import { getDictionary } from "@/content";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);
  const present = dictionary.common.present;

  return (
    <>
      <main id="content">
        <Hero copy={dictionary.hero} />
        <About copy={dictionary.about} />
        <Stack copy={dictionary.stack} />
        <Work copy={dictionary.work} present={present} />
        <Experience copy={dictionary.experience} present={present} />
        <Education copy={dictionary.education} present={present} />
        <Contact copy={dictionary.contact} />
      </main>
      <Footer
        copy={dictionary.footer}
        nav={dictionary.nav}
        common={dictionary.common}
      />
    </>
  );
}
