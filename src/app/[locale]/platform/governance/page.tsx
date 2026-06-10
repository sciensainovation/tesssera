import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "../../dictionaries";
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
  return { title: dict.platformGovernance.meta.title };
}

export default async function PlatformGovernancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const g = dict.platformGovernance;
  const L = (href: string) => localizedHref(href, locale);
  const crumbs = [
    { label: g.breadcrumb[0], href: "/" },
    { label: g.breadcrumb[1], href: "/platform/overview" },
    { label: g.breadcrumb[2] },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={g.hero.headline}
        subline={g.hero.subline}
        locale={locale}
      />

      {/* Capabilities de compliance */}
      <Section>
        <Container>
          <SectionHeading title={g.capabilities.headline} accent />
          <div
            data-animate="cascade"
            className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2"
          >
            {g.capabilities.items.map((item) => (
              <div key={item.title}>
                <h3 className="t-h4 text-ink">{item.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Conformidade por framework — inverted table */}
      <Section invert>
        <Container>
          <SectionHeading title={g.table.headline} />
          <div
            data-animate="fade-in"
            className="mt-12 overflow-x-auto rounded-sm border border-line"
          >
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-line">
                  {g.table.headers.map((h) => (
                    <th
                      key={h}
                      className="t-label whitespace-nowrap px-5 py-4 font-medium text-faint"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {g.table.rows.map((row) => (
                  <tr
                    key={row.framework}
                    className="border-b border-line align-top last:border-0"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-ink">
                      {row.framework}
                    </td>
                    <td className="px-5 py-4 text-muted">{row.coverage}</td>
                    <td className="px-5 py-4 text-muted">{row.mechanism}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 flex justify-center" data-animate="fade-up">
            <LinkButton href={L(g.docsHref)} variant="secondary">
              {g.docsCta} <span aria-hidden>→</span>
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
