import type { Dictionary } from "@/i18n/dictionary";
import { type Locale, localizedHref } from "@/i18n/config";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/link-button";
import { WaveParticles } from "@/components/ui/wave-particles";

export function CtaBanner({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const c = dict.cta;
  const L = (href: string) => localizedHref(href, locale);

  return (
    <Section invert className="relative overflow-hidden">
      <WaveParticles className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />
      <Container>
        <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center text-center">
          <div className="accent-line mb-6" data-animate="fade-in" />
          <h2 className="t-h2 text-ink" data-animate="fade-up-slow">
            {c.title}
          </h2>
          <p className="section-sub mt-4" data-animate="fade-up">
            {c.sub}
          </p>
          <div
            className="mt-8"
            data-animate="fade-up"
            style={{ transitionDelay: "120ms" }}
          >
            <LinkButton href={L(c.buttonHref)} variant="primary">
              {c.button}
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
