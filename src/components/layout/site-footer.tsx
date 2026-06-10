import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionary";
import { type Locale, localizedHref } from "@/i18n/config";
import { Container } from "@/components/ui/container";
import { TesseraLogo } from "@/components/ui/tessera-logo";

export function SiteFooter({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const f = dict.footer;
  const L = (href: string) => localizedHref(href, locale);

  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <TesseraLogo className="h-[70px]" />
            <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed text-muted">
              {f.brandDesc}
            </p>
            <div className="mt-4 flex flex-col gap-1 text-[13px] text-muted">
              {f.contact.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {f.badges.map((badge) => (
                <span key={badge} className="tag">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {f.cols.map((col) => (
            <div key={col.title}>
              <div className="t-label mb-4 text-faint">{col.title}</div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={L(link.href)}
                      className="text-[14px] text-muted transition-colors hover:text-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
          <p className="t-mono text-[11px] text-faint">{f.copyright}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {f.legal.map((item) => (
              <button
                key={item}
                type="button"
                className="text-[12px] text-faint transition-colors hover:text-body"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Giant watermark — 75% visible, 25% clipped by footer overflow */}
      <div aria-hidden className="footer-watermark mt-6 text-center">
        Tessera
      </div>
    </footer>
  );
}
