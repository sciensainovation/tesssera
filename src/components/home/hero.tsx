import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionary";
import { type Locale, localizedHref } from "@/i18n/config";
import { Container } from "@/components/ui/container";
import { LazyVideo } from "@/components/ui/lazy-video";
import { LogoWall } from "@/components/home/logo-wall";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.hero;
  const L = (href: string) => localizedHref(href, locale);

  return (
    <>
      <section className="relative min-h-dvh overflow-hidden bg-subtle">
        {/* full-bleed video background */}
        <LazyVideo
          src="/Videos/sim.mp4"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* theme-reactive scrim */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[var(--c-bg)] via-[color-mix(in_srgb,var(--c-bg)_55%,transparent)] to-[color-mix(in_srgb,var(--c-bg)_22%,transparent)]"
        />

        {/* copy — locked to container, anchored bottom; headline left, subline+CTAs right */}
        <div className="relative flex min-h-dvh flex-col justify-end">
          <Container className="pb-[210px] pt-[140px]">
            <div className="flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-12">
              <h1
                className="max-w-[846px] text-[clamp(40px,7vw,72px)] font-normal leading-none tracking-[-0.04em] text-ink"
                data-animate="fade-up-slow"
              >
                {h.headline}
              </h1>
              <div
                className="flex shrink-0 flex-col items-start gap-4 md:items-end"
                data-animate="fade-up"
              >
                <p className="max-w-[307px] text-[15px] font-semibold leading-snug text-ink md:text-right">
                  {h.subline}
                </p>
                <div className="flex flex-wrap gap-2.5 md:justify-end">
                  <Link
                    href={L(h.ctaPrimaryHref)}
                    className="btn btn-primary !rounded-full !px-4 !py-3 !text-[13px]"
                  >
                    {h.ctaPrimary}
                  </Link>
                  <Link
                    href={L(h.ctaSecondaryHref)}
                    className="btn !rounded-full bg-surface !px-4 !py-3 !text-[13px] text-ink transition-colors hover:bg-raised"
                  >
                    {h.ctaSecondary}
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* client logos + stats — glass card overlapping the hero's bottom edge */}
      <Container className="relative z-10 -mt-[150px] pb-6">
        <LogoWall />
      </Container>
    </>
  );
}
