import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "./dictionaries";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { ValueGrid } from "@/components/home/value-grid";
import { Platform } from "@/components/home/platform";
import { Industries } from "@/components/home/industries";
import { Team } from "@/components/home/team";
import { DiscoveryTimeline } from "@/components/home/discovery-timeline";
import { WhySciensa } from "@/components/home/why-sciensa";
import { CtaBanner } from "@/components/home/cta-banner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict} locale={locale} />
      <Intro />
      <ValueGrid dict={dict} />
      <Industries dict={dict} locale={locale} />
      <Platform dict={dict} locale={locale} />
      <Team dict={dict} />
      <DiscoveryTimeline locale={locale} />
      <WhySciensa dict={dict} locale={locale} />
      <CtaBanner dict={dict} locale={locale} />
    </>
  );
}
