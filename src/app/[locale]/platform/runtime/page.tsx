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
  return { title: dict.platformRuntime.meta.title };
}

export default async function PlatformRuntimePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const r = dict.platformRuntime;
  const L = (href: string) => localizedHref(href, locale);
  const crumbs = [
    { label: r.breadcrumb[0], href: "/" },
    { label: r.breadcrumb[1] },
    { label: r.breadcrumb[2] },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={r.hero.headline}
        subline={r.hero.subline}
        locale={locale}
      />

      {/* 3 princípios não-negociáveis */}
      <Section>
        <Container>
          <SectionHeading title={r.principles.headline} accent />
          <div
            data-animate="cascade"
            className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3"
          >
            {r.principles.items.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="t-mono text-[13px] text-faint">
                  {item.label}
                </span>
                <h3 className="t-h4 mt-3 text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Execução em supersteps */}
      <Section>
        <Container>
          <SectionHeading title={r.execution.headline} accent />
          <div className="mt-12 rounded-[20px] border border-line bg-surface p-4 md:p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/diagrama3.png"
              alt={r.execution.diagramAlt}
              width={1764}
              height={656}
              className="mx-auto h-auto w-full"
            />
          </div>
          <div
            data-animate="cascade"
            className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2"
          >
            {r.execution.items.map((item) => (
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

      {/* Tessera Simulator — inverted spotlight */}
      <Section invert>
        <Container>
          <SectionHeading title={r.simulator.headline} />
          <div className="mt-12 overflow-hidden rounded-[16px] border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/runtime-simulator.png"
              alt={r.simulator.diagramAlt}
              width={1384}
              height={891}
              className="h-auto w-full"
            />
          </div>
          <div className="mt-10 flex justify-center" data-animate="fade-up">
            <LinkButton href={L(r.docsHref)} variant="secondary">
              {r.docsCta} <span aria-hidden>→</span>
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
