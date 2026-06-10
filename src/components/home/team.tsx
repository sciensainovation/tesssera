import type { Dictionary } from "@/i18n/dictionary";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { LazyVideo } from "@/components/ui/lazy-video";

export function Team({ dict }: { dict: Dictionary }) {
  const t = dict.team;

  return (
    <Section>
      <Container>
        {/* dark feature card with brand video background */}
        <div className="relative flex min-h-[440px] items-center overflow-hidden rounded-[32px] bg-slate md:min-h-[520px]">
          <LazyVideo
            src="/Videos/team-bg.mp4"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[rgba(26,31,36,0.82)]"
          />
          <div className="relative w-full px-8 py-20 md:px-16 md:py-24">
            <div className="max-w-[480px]">
              <h2 className="t-h2 text-offwhite" data-animate="fade-up-slow">
                {t.headline}
              </h2>
              <p
                className="mt-5 text-[16px] leading-relaxed text-sage"
                data-animate="fade-up"
              >
                {t.body}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
