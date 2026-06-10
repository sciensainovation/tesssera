import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "../dictionaries";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { Placeholder } from "@/components/ui/placeholder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pt");
  return { title: dict.deployment.meta.title };
}

export default async function DeploymentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const d = dict.deployment;
  const L = (href: string) => localizedHref(href, locale);
  const crumbs = [
    { label: d.breadcrumb[0], href: "/" },
    { label: d.breadcrumb[1] },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={d.hero.headline}
        subline={d.hero.subline}
        locale={locale}
      />

      {/* Flexibilidade de infraestrutura */}
      <Section>
        <Container>
          <SectionHeading title={d.infra.headline} sub={d.infra.sub} accent />
          <div
            data-animate="cascade"
            className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {d.infra.items.map((item) => (
              <div key={item.title}>
                <h3 className="t-h4 text-ink">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4 edições */}
      <Section>
        <Container>
          <SectionHeading title={d.editions.headline} accent />
          <div
            data-animate="cascade"
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {d.editions.items.map((ed) => (
              <Link
                key={ed.slug}
                href={L(`/deployment/${ed.slug}`)}
                className={`card-hover group flex flex-col rounded-sm border p-6 ${
                  ed.featured ? "border-accent" : "border-line"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="t-mono text-[12px] text-faint">
                    {ed.price}
                  </span>
                  {ed.featured && "badge" in ed ? (
                    <span className="rounded-sm border border-accent px-2 py-0.5 text-[11px] font-medium text-accent-ink">
                      {ed.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="t-h4 mt-3 text-ink">{ed.title}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">
                  {ed.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-body">
                  {d.editions.linkLabel}
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Jornada — inverted */}
      <Section invert>
        <Container>
          <SectionHeading title={d.journey.headline} />
          <Placeholder
            label={d.journey.diagramAlt}
            ratio="16 / 5"
            className="mt-12"
          />
          <div
            data-animate="cascade"
            className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3"
          >
            {d.journey.items.map((item) => (
              <div key={item.title}>
                <h3 className="t-h4 text-ink">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
