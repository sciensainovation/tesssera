import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "../../dictionaries";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { Placeholder } from "@/components/ui/placeholder";
import { LinkButton } from "@/components/ui/link-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pt");
  return { title: dict.platformFinops.meta.title };
}

export default async function PlatformFinopsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const f = dict.platformFinops;
  const L = (href: string) => localizedHref(href, locale);
  const crumbs = [
    { label: f.breadcrumb[0], href: "/" },
    { label: f.breadcrumb[1], href: "/platform/overview" },
    { label: f.breadcrumb[2] },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={f.hero.headline}
        subline={f.hero.subline}
        locale={locale}
      />

      {/* Capabilities de FinOps */}
      <Section>
        <Container>
          <SectionHeading title={f.capabilities.headline} accent />
          <div
            data-animate="cascade"
            className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2"
          >
            {f.capabilities.items.map((item) => (
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

      {/* Admin / Quotas / Dashboard CFO — inverted spotlight */}
      <Section invert>
        <Container>
          <SectionHeading title={f.screenshot.headline} />
          <Placeholder
            label={f.screenshot.diagramAlt}
            ratio="16 / 6"
            className="mt-12"
          />
          <div className="mt-10 flex justify-center" data-animate="fade-up">
            <LinkButton href={L(f.docsHref)} variant="secondary">
              {f.docsCta} <span aria-hidden>→</span>
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
