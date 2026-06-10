import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "../../dictionaries";
import { DocBlocks, type DocBlock } from "@/components/docs/doc-blocks";

const SLUGS: string[][] = [
  ["quickstart"],
  ["platform", "architecture"],
  ["platform", "runtime"],
  ["platform", "studio"],
  ["platform", "console"],
  ["platform", "simulator"],
  ["platform", "deploy"],
  ["capabilities", "compliance"],
  ["capabilities", "finops"],
  ["capabilities", "brms"],
  ["capabilities", "multi-tenancy"],
  ["capabilities", "observability"],
  ["integrations", "llm-providers"],
  ["integrations", "erp"],
  ["integrations", "crm"],
  ["integrations", "channels"],
  ["integrations", "banking"],
  ["integrations", "custom-tools"],
  ["api", "reference"],
  ["api", "sdk"],
  ["api", "mcp"],
];

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pt");
  const key = (slug ?? []).join("/");
  const pages = dict.docs.pages;
  const page = pages[key as keyof typeof pages];
  return { title: page ? `${page.title}, Docs | Tessera` : "Docs | Tessera" };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const key = (slug ?? []).join("/");
  const pages = dict.docs.pages;
  if (!(key in pages)) notFound();
  const page = pages[key as keyof typeof pages];

  return (
    <article className="max-w-[760px]">
      <div className="t-mono text-[12px] text-faint">{page.breadcrumb}</div>
      <h1 className="t-h2 mt-3 text-ink">{page.title}</h1>
      <div className="mt-6">
        <DocBlocks blocks={page.blocks as DocBlock[]} locale={locale} />
      </div>
    </article>
  );
}
