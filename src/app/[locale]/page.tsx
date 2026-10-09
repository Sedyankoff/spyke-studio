import { Footer } from "@/components/layout/footer";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";
import { getDictionary } from "@/content";
import { projects } from "@/content/projects";
import { isLocale } from "@/i18n/config";
import { embeddableProjects } from "@/lib/embed";
import { notFound } from "next/navigation";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);
  const present = dictionary.common.present;
  const embeddable = await embeddableProjects(projects);

  return (
    <>
      <main id="content">
        <Hero copy={dictionary.hero} />
        <About copy={dictionary.about} />
        <Stack copy={dictionary.stack} />
        <Work
          copy={dictionary.work}
          present={present}
          embeddable={embeddable}
        />
        <Experience copy={dictionary.experience} common={dictionary.common} />
      </main>
      <Footer
        copy={dictionary.footer}
        nav={dictionary.nav}
        common={dictionary.common}
      />
    </>
  );
}
