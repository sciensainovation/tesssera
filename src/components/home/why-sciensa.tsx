import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionary";
import { type Locale, localizedHref } from "@/i18n/config";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { LazyVideo } from "@/components/ui/lazy-video";

const ITEMS: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Caso próprio em produção desde 2024",
    body: "Sciensa opera agentes bancários. Tessera nasceu desse caso. Você não está sendo cobaia.",
  },
  {
    title: "Multi-vendor por princípio",
    body: "Não revendemos AWS, Anthropic, Google ou Microsoft. Recomendamos a combinação certa.",
  },
  {
    title: "Compliance PT-BR como pré-requisito",
    body: "LGPD, BACEN 4.658 e exigências de auditoria brasileira já estão na plataforma.",
  },
  {
    title: "Autonomia garantida",
    body: "Seu time treinado em paralelo. Código-fonte em escrow legal para Enterprise e Air-Gapped.",
  },
];

const TAGS = ["BACEN 4.658", "LGPD", "SOX", "HIPAA", "ISO 42001"];

export function WhySciensa({
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const L = (href: string) => localizedHref(href, locale);

  return (
    <Section>
      <Container>
        {/* dark feature band with brand video background */}
        <div className="relative overflow-hidden rounded-[32px] bg-slate px-8 py-20 md:px-16 md:py-24">
          <LazyVideo
            src="/Videos/data.mp4"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-[rgba(20,24,28,0.86)]" />

          <div className="relative flex flex-col items-center gap-14">
            <h2
              className="t-h2 max-w-[760px] text-center text-offwhite"
              data-animate="fade-up"
            >
              Construída por quem já opera agentes em produção.
            </h2>

            <div
              data-animate="cascade"
              className="grid w-full max-w-[1184px] grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
            >
              {ITEMS.map((it) => (
                <div key={it.title}>
                  <h3 className="text-[20px] font-semibold leading-[1.3] text-offwhite">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-sage">
                    {it.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-sage/40 px-3 py-1 text-[11px] tracking-[0.04em] text-sage"
                >
                  {t}
                </span>
              ))}
            </div>

            <Link
              href={L("/why-sciensa")}
              className="rounded-full border border-white/30 px-6 py-3 text-[14px] text-sage transition-colors hover:border-white/60 hover:text-offwhite"
            >
              Conheça a Sciensa <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
