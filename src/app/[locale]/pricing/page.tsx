import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "../dictionaries";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { LinkButton } from "@/components/ui/link-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pt");
  return { title: dict.pricing.meta.title };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const p = dict.pricing;
  const L = (href: string) => localizedHref(href, locale);
  const crumbs = [
    { label: p.breadcrumb[0], href: "/" },
    { label: p.breadcrumb[1] },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={p.hero.headline}
        subline={p.hero.subline}
        locale={locale}
      />

      {/* Modelo de precificação — table */}
      <Section>
        <Container>
          <SectionHeading title={p.model.headline} accent />
          <div
            data-animate="fade-in"
            className="mt-12 overflow-x-auto rounded-sm border border-line"
          >
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-line">
                  {p.model.headers.map((h) => (
                    <th
                      key={h}
                      className="t-label px-5 py-4 font-medium text-faint"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.model.rows.map((row) => (
                  <tr
                    key={row.component}
                    className="border-b border-line align-top last:border-0"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-ink">
                      {row.component}
                    </td>
                    <td className="px-5 py-4 text-muted">{row.model}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Faixas indicativas */}
      <Section>
        <Container>
          <SectionHeading title={p.ranges.headline} />
          <div
            data-animate="cascade"
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {p.ranges.items.map((item) => (
              <div
                key={item.title}
                className={`flex flex-col rounded-sm border p-6 ${
                  item.featured ? "border-accent" : "border-line"
                }`}
              >
                <h3 className="t-h4 text-ink">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[12px] text-faint" data-animate="fade-up">
            {p.ranges.note}
          </p>
        </Container>
      </Section>

      {/* CTA banner — inverted */}
      <Section invert>
        <Container>
          <div className="mx-auto flex max-w-[680px] flex-col items-center text-center">
            <div className="accent-line mb-6" data-animate="fade-in" />
            <h2 className="t-h2 text-ink" data-animate="fade-up-slow">
              {p.ctaBanner.title}
            </h2>
            <p className="section-sub mt-4" data-animate="fade-up">
              {p.ctaBanner.sub}
            </p>
            <div
              className="mt-8"
              data-animate="fade-up"
              style={{ transitionDelay: "120ms" }}
            >
              <LinkButton href={L("/discovery")} variant="primary">
                {p.ctaBanner.button}
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
