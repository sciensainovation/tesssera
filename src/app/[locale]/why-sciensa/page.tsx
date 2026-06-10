import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "../dictionaries";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pt");
  return { title: dict.whySciensaPage.meta.title };
}

export default async function WhySciensaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const w = dict.whySciensaPage;
  const crumbs = [
    { label: w.breadcrumb[0], href: "/" },
    { label: w.breadcrumb[1] },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={w.hero.headline}
        subline={w.hero.subline}
        locale={locale}
      />

      {/* 6 diferenciais */}
      <Section>
        <Container>
          <SectionHeading title={w.differentials.headline} accent />
          <div
            data-animate="cascade"
            className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2"
          >
            {w.differentials.items.map((item) => (
              <div key={item.title}>
                <h3 className="t-h4 text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ de confiança — inverted */}
      <Section invert>
        <Container>
          <SectionHeading title={w.faq.headline} />
          <div className="mx-auto mt-12 max-w-[760px]">
            {w.faq.items.map((item, i) => (
              <div
                key={item.q}
                className={`py-6 ${i > 0 ? "border-t border-line" : ""}`}
                data-animate="fade-up"
              >
                <h3 className="t-h4 text-ink">{item.q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
