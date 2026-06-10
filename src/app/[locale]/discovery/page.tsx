import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "../dictionaries";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { DiscoveryForm } from "@/components/discovery/discovery-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pt");
  return { title: dict.discovery.meta.title };
}

export default async function DiscoveryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const d = dict.discovery;
  const crumbs = [{ label: d.breadcrumb[0], href: "/" }, { label: d.breadcrumb[1] }];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={d.hero.headline}
        subline={d.hero.subline}
        locale={locale}
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* What happens / what you get / contact */}
            <div className="flex flex-col gap-8" data-animate="fade-up">
              {d.info.map((item) => (
                <div key={item.title}>
                  <h3 className="t-h4 text-ink">{item.title}</h3>
                  <p className="mt-2 max-w-[460px] text-[15px] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:justify-self-end" data-animate="fade-up">
              <DiscoveryForm t={d.form} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
