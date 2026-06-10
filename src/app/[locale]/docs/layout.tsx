import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "../dictionaries";
import { Container } from "@/components/ui/container";
import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <Container className="pb-16 pt-[88px] md:pb-24 md:pt-[120px]">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
        <DocsSidebar groups={dict.docs.sidebar} locale={locale} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </Container>
  );
}
