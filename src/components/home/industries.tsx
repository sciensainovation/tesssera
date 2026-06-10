import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionary";
import { type Locale, localizedHref } from "@/i18n/config";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";

// Figma reworkhome 2: linear-gradient(133deg, bg 14% -> accent 86%).
// Both stops are theme tokens, so the gradient flips for dark automatically
// (--c-bg: #f4f1ea/#1a1f24 · --grad-*: light/dark variants).
const GRAD = ["--grad-sage", "--grad-blue", "--grad-terra", "--grad-sage", "--grad-blue"];
const gradient = (token: string) =>
  `linear-gradient(133deg, var(--c-bg) 14%, var(${token}) 86%)`;

export function Industries({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const ind = dict.industries;
  const L = (href: string) => localizedHref(href, locale);

  return (
    <Section className="overflow-hidden">
      <Container>
        {/* headline left-aligned (Figma: H2 40 / -0.8) */}
        <SectionHeading title={ind.headline} align="left" />
      </Container>

      <div data-animate="cascade" className="bleed-row mt-12 gap-8 md:gap-10">
        {ind.items.map((item, i) => (
          <Link
            key={item.href}
            href={L(item.href)}
            className="bleed-card card-hover group flex min-h-[460px] flex-col justify-between rounded-[8px] p-8 md:p-10"
            style={{
              background: gradient(GRAD[i % GRAD.length]),
              flexBasis: "clamp(300px, 33vw, 440px)",
            }}
          >
            <div>
              <h3 className="text-[28px] font-semibold leading-[1.2] tracking-[-0.28px] text-ink">
                {item.title}
              </h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-body opacity-70">
                {item.body}
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-1.5 text-[16px] text-body">
              {ind.linkLabel}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
