import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "../dictionaries";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pt");
  return { title: dict.industriesIndex.meta.title };
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const idx = dict.industriesIndex;
  const L = (href: string) => localizedHref(href, locale);
  const crumbs = [
    { label: idx.breadcrumb[0], href: "/" },
    { label: idx.breadcrumb[1] },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        headline={idx.hero.headline}
        subline={idx.hero.subline}
        locale={locale}
      />

      <Section>
        <Container>
          <div
            data-animate="cascade"
            className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2"
          >
            {idx.items.map((item, i) => {
              const isLast = i === idx.items.length - 1;
              return (
                <Link
                  key={item.slug}
                  href={L(`/industries/${item.slug}`)}
                  className={`card-hover group flex flex-col ${
                    isLast ? "md:col-span-2" : ""
                  }`}
                >
                  {!isLast ? (
                    <div className="dot-grid mb-5 flex aspect-[16/6] w-full items-center justify-center rounded-sm border border-line bg-surface">
                      <span className="t-label text-faint">
                        Imagem · {item.title}
                      </span>
                    </div>
                  ) : null}
                  <h3 className="t-h3 text-ink">{item.title}</h3>
                  <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-muted">
                    {item.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-body">
                    {idx.linkLabel}
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
