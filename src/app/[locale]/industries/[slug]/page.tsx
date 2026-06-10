import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "../../dictionaries";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { LinkButton } from "@/components/ui/link-button";

const SLUGS = [
  "banking-fintechs",
  "insurance",
  "healthcare",
  "retail",
  "telecom",
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pt");
  const pages = dict.industryPages;
  const page = pages[slug as keyof typeof pages];
  return { title: page ? page.meta.title : "Indústrias | Tessera" };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const pages = dict.industryPages;
  if (!(slug in pages)) notFound();
  const p = pages[slug as keyof typeof pages];
  const L = (href: string) => localizedHref(href, locale);

  const crumbs = [
    { label: p.breadcrumb[0], href: "/" },
    { label: p.breadcrumb[1], href: "/industries" },
    { label: p.breadcrumb[2] },
  ];
  const useCaseCols =
    p.useCases.items.length === 4 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  const why = "whyTessera" in p ? p.whyTessera : undefined;

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={p.hero.headline}
        subline={p.hero.subline}
        cta={{ label: p.hero.cta, href: "/discovery" }}
        locale={locale}
      />

      {/* Casos de uso */}
      <Section>
        <Container>
          <SectionHeading title={p.useCases.headline} accent />
          <div
            data-animate="cascade"
            className={`mt-14 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 ${useCaseCols}`}
          >
            {p.useCases.items.map((item) => (
              <div key={item.title} className="flex flex-col">
                <span className="t-mono text-[13px] text-faint">
                  {item.label}
                </span>
                <h3 className="t-h4 mt-3 text-ink">{item.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Por que Tessera (only some sectors) */}
      {why ? (
        <Section>
          <Container>
            <SectionHeading title={why.headline} />
            <div
              data-animate="cascade"
              className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3"
            >
              {why.items.map((item) => (
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
      ) : null}

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
