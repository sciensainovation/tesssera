import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "../../dictionaries";
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
  return { title: dict.platformOverview.meta.title };
}

export default async function PlatformOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const o = dict.platformOverview;
  const L = (href: string) => localizedHref(href, locale);
  const crumbs = [
    { label: o.breadcrumb[0], href: "/" },
    { label: o.breadcrumb[1] },
    { label: o.breadcrumb[2] },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={o.hero.headline}
        subline={o.hero.subline}
        locale={locale}
      />

      {/* O que a Tessera não é */}
      <Section>
        <Container>
          <SectionHeading title={o.notTessera.headline} accent />
          <div
            data-animate="cascade"
            className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3"
          >
            {o.notTessera.items.map((item) => (
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

      {/* Arquitetura — 5 camadas */}
      <Section>
        <Container>
          <SectionHeading title={o.architecture.headline} />
          <Placeholder
            label={o.architecture.diagramAlt}
            ratio="16 / 6"
            className="mt-12"
          />
          <div
            data-animate="cascade"
            className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2"
          >
            {o.architecture.layers.map((layer) => (
              <div key={layer.title}>
                <h3 className="t-h4 text-ink">{layer.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  {layer.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Posicionamento de mercado — inverted */}
      <Section invert>
        <Container>
          <SectionHeading title={o.market.headline} />
          <Placeholder
            label={o.market.diagramAlt}
            ratio="16 / 6"
            className="mt-12"
          />
          <p
            className="section-sub mx-auto mt-8 text-center"
            data-animate="fade-up"
          >
            {o.market.body}
          </p>
        </Container>
      </Section>

      {/* Diferenciais exclusivos */}
      <Section>
        <Container>
          <SectionHeading
            title={o.differentials.headline}
            sub={o.differentials.sub}
            accent
          />
          <div
            data-animate="cascade"
            className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {o.differentials.items.map((item) => (
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

      {/* Links para camadas detalhadas */}
      <Section>
        <Container>
          <SectionHeading title={o.layerLinks.headline} />
          <div
            data-animate="cascade"
            className="mt-14 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {o.layerLinks.items.map((item) => (
              <Link
                key={item.href}
                href={L(item.href)}
                className="card-hover group flex flex-col"
              >
                <h3 className="t-h4 text-ink">{item.title}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">
                  {item.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-body">
                  Ver
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
    </>
  );
}
