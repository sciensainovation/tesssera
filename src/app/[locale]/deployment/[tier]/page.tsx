import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "../../dictionaries";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { LinkButton } from "@/components/ui/link-button";

const TIERS = ["community", "professional", "enterprise", "air-gapped"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return TIERS.map((tier) => ({ tier }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tier: string }>;
}): Promise<Metadata> {
  const { locale, tier } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pt");
  const tiers = dict.deployment.tiers;
  const t = tiers[tier as keyof typeof tiers];
  return { title: t ? t.meta.title : dict.deployment.meta.title };
}

export default async function DeploymentTierPage({
  params,
}: {
  params: Promise<{ locale: string; tier: string }>;
}) {
  const { locale, tier } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const tiers = dict.deployment.tiers;
  if (!(tier in tiers)) notFound();
  const t = tiers[tier as keyof typeof tiers];
  const L = (href: string) => localizedHref(href, locale);
  const crumbs = [
    { label: t.breadcrumb[0], href: "/" },
    { label: t.breadcrumb[1], href: "/deployment" },
    { label: t.breadcrumb[2] },
  ];
  const sub = "sub" in t ? t.sub : undefined;

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={t.headline}
        subline={sub}
        locale={locale}
      />

      <Section>
        <Container>
          <div
            data-animate="cascade"
            className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2"
          >
            {t.blocks.map((block) => (
              <div key={block.title}>
                <h3 className="t-h4 text-ink">{block.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12" data-animate="fade-up">
            <LinkButton href={L(t.cta.href)} variant="primary">
              {t.cta.label}
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
