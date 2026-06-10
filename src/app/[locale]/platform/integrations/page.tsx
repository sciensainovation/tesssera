import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "../../dictionaries";
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
  return { title: dict.platformIntegrations.meta.title };
}

export default async function PlatformIntegrationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const p = dict.platformIntegrations;
  const crumbs = [
    { label: p.breadcrumb[0], href: "/" },
    { label: p.breadcrumb[1], href: "/platform/overview" },
    { label: p.breadcrumb[2] },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={p.hero.headline}
        subline={p.hero.subline}
        locale={locale}
      />

      {/* Conectores por categoria */}
      <Section>
        <Container>
          <SectionHeading title={p.connectors.headline} accent />
          <div
            data-animate="cascade"
            className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2"
          >
            {p.connectors.categories.map((cat) => (
              <div key={cat.label}>
                <h3 className="text-[15px] font-medium text-ink">{cat.label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
