import Link from "next/link";
import { type Locale, localizedHref } from "@/i18n/config";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// copy verbatim from Figma reworkhome
const PHASES: ReadonlyArray<readonly [string, string, string]> = [
  [
    "Discovery",
    "Sessão executiva, workshop técnico de uma semana e relatório de viabilidade.",
    "Sem. 1–4",
  ],
  [
    "Pilot",
    "Ambiente piloto, integração com sistemas críticos, treinamento e go-live.",
    "Sem. 5–12",
  ],
  [
    "Production",
    "Rollout completo, SLA contratual ativo e Quarterly Business Review com C-level.",
    "Sem. 13+",
  ],
];

export function DiscoveryTimeline({ locale }: { locale: Locale }) {
  const L = (href: string) => localizedHref(href, locale);

  return (
    <Section>
      <Container className="flex flex-col items-center gap-12 md:gap-16">
        <div className="flex flex-col items-center gap-5 text-center" data-animate="fade-up">
          <h2 className="t-h2 max-w-[760px] text-ink">Discovery de 1 a 4 semanas</h2>
          <p className="section-sub mx-auto">
            Três fases com entregáveis concretos e marcos de decisão.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4" data-animate="cascade">
          {PHASES.map(([phase, desc, week]) => (
            <div
              key={phase}
              className="grid grid-cols-1 items-center gap-2 rounded-sm bg-surface px-6 py-7 md:grid-cols-[1fr_2fr_1fr] md:gap-8 md:px-10"
            >
              <h3 className="text-[20px] font-semibold leading-tight text-ink">
                {phase}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted">{desc}</p>
              <p className="text-[18px] font-light text-ink md:text-right">
                {week}
              </p>
            </div>
          ))}
        </div>

        <Link href={L("/why-sciensa")} className="btn btn-secondary">
          Conheça a Sciensa →
        </Link>
      </Container>
    </Section>
  );
}
