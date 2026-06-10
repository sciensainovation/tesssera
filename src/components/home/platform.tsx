import Link from "next/link";
import {
  GitBranch,
  type LucideIcon,
  MessagesSquare,
  Network,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import type { Dictionary } from "@/i18n/dictionary";
import { type Locale, localizedHref } from "@/i18n/config";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// Figma reworkhome 2: 5 features, each a gradient tile (same palette as Industries)
const FEATURES: ReadonlyArray<{
  title: string;
  body: string;
  grad: string;
  icon: LucideIcon;
}> = [
  {
    title: "Interaction Surfaces",
    body: "Conversacional · Programático · Event-driven · A2A · Scheduled",
    grad: "--grad-sage",
    icon: MessagesSquare,
  },
  {
    title: "Compliance & Governance",
    body: "Audit trail imutável, PII nativa, 4-eyes, pacotes regulatórios.",
    grad: "--grad-blue",
    icon: ShieldCheck,
  },
  {
    title: "FinOps",
    body: "Cost attribution multidimensional, budget caps, dashboard CFO.",
    grad: "--grad-terra",
    icon: Wallet,
  },
  {
    title: "Connectivity & Action",
    body: "LLMs, ERPs, CRMs, canais, dados, padrões enterprise nativos.",
    grad: "--grad-sage",
    icon: Network,
  },
  {
    title: "BRMS",
    body: "Motor de regras embarcado. Decisões determinísticas e probabilísticas no mesmo agente.",
    grad: "--grad-blue",
    icon: GitBranch,
  },
];

export function Platform({
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const L = (href: string) => localizedHref(href, locale);

  return (
    <Section>
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="t-h2 max-w-[760px] text-ink" data-animate="fade-up">
          The AgentOS for enterprise scale.
        </h2>
        <p className="max-w-[620px] text-[18px] font-light leading-relaxed text-muted opacity-85">
          Construída do zero para determinismo, governança e operação contínua.
        </p>

        <div
          data-animate="cascade"
          className="mt-14 flex w-full max-w-[1280px] flex-wrap items-start justify-center gap-x-16 gap-y-14"
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex w-[340px] max-w-full flex-col items-center gap-4 text-center"
            >
              <div
                className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-[8px]"
                style={{
                  background: `linear-gradient(135deg, var(--c-bg) 14%, var(${f.grad}) 86%)`,
                }}
              >
                <f.icon size={32} strokeWidth={1.5} className="text-ink" aria-hidden />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[20px] font-semibold leading-[1.3] text-ink">
                  {f.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-muted">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10" data-animate="fade-up">
          <Link href={L("/platform/overview")} className="btn btn-secondary">
            Ver arquitetura completa <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
