import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { type Locale, localizedHref } from "@/i18n/config";

type Crumb = { label: string; href?: string };

export function PageHero({
  crumbs,
  headline,
  subline,
  cta,
  locale,
}: {
  crumbs: Crumb[];
  headline: string;
  subline?: string;
  cta?: { label: string; href: string };
  locale: Locale;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[104px] pb-16 md:pt-[136px] md:pb-20">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]"
      />
      <Container className="relative">
        <nav
          aria-label="breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-faint"
          data-animate="fade-up"
        >
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                {c.href ? (
                  <Link
                    href={localizedHref(c.href, locale)}
                    className="transition-colors hover:text-body"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className={last ? "text-muted" : ""}>{c.label}</span>
                )}
                {!last ? <span aria-hidden>/</span> : null}
              </span>
            );
          })}
        </nav>
        <h1 className="t-h1 max-w-[920px] text-ink" data-animate="fade-up-slow">
          {headline}
        </h1>
        {subline ? (
          <p
            className="t-lead mt-5 max-w-[700px] text-muted"
            data-animate="fade-up"
            style={{ transitionDelay: "120ms" }}
          >
            {subline}
          </p>
        ) : null}
        {cta ? (
          <div
            className="mt-8"
            data-animate="fade-up"
            style={{ transitionDelay: "200ms" }}
          >
            <LinkButton href={localizedHref(cta.href, locale)} variant="primary">
              {cta.label}
            </LinkButton>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
