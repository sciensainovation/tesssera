"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionary";
import { type Locale, localizedHref } from "@/i18n/config";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type NavItem = { title: string; desc: string; href: string };
type LinkItem = { label: string; href: string };

// Featured illustration — dot-matrix (subtle grid + blue accent pattern)
const DOT_BLUE = new Set([
  "2,4", "2,5", "2,6", "2,7",
  "3,3", "3,8",
  "4,4", "4,5", "4,6", "4,7",
]);
function DotMatrix() {
  const cells = [];
  for (let r = 1; r <= 5; r++) {
    for (let c = 1; c <= 10; c++) {
      cells.push(
        <span
          key={`${r},${c}`}
          className={`h-2.5 w-2.5 ${DOT_BLUE.has(`${r},${c}`) ? "bg-brand" : "bg-subtle"}`}
        />,
      );
    }
  }
  return (
    <div className="grid grid-cols-10 gap-1" aria-hidden>
      {cells}
    </div>
  );
}

export function SiteNav({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const nav = dict.nav;
  const L = (href: string) => localizedHref(href, locale);

  const menus = [
    { key: "product", label: nav.product, mega: nav.productMega, items: nav.productItems },
    { key: "industries", label: nav.industries, mega: nav.industriesMega, items: nav.industriesItems },
    { key: "company", label: nav.company, mega: nav.companyMega, items: nav.companyItems },
  ];
  const active = menus.find((m) => m.key === openMenu) ?? null;

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4">
      <div
        className="relative w-full max-w-[1440px]"
        onMouseLeave={() => setOpenMenu(null)}
      >
        {/* glass pill */}
        <div className="flex items-center justify-between gap-3 rounded-full border border-line bg-glass py-2 pl-3 pr-3 shadow-[0_10px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl">
          <Link href={L("/")} aria-label="Tessera" className="shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate py-1.5 pl-2 pr-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Tessera/tessera-symbol.png"
                alt=""
                width={89}
                height={88}
                className="h-7 w-auto"
              />
              <span className="text-[19px] font-semibold leading-none tracking-tight text-offwhite">
                Tessera
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navegação principal">
            {menus.map((m) => (
              <button
                key={m.key}
                type="button"
                onMouseEnter={() => setOpenMenu(m.key)}
                onFocus={() => setOpenMenu(m.key)}
                className={`flex items-center gap-1 rounded-full px-3 py-2 text-[15px] transition-colors ${
                  openMenu === m.key ? "text-ink" : "text-muted hover:text-body"
                }`}
              >
                <span className={openMenu === m.key ? "underline underline-offset-4" : ""}>
                  {m.label}
                </span>
                <ChevronDown
                  size={13}
                  strokeWidth={1.5}
                  className={`transition-transform duration-150 ${openMenu === m.key ? "rotate-180" : ""}`}
                />
              </button>
            ))}
            <Link
              href={L(nav.docsHref)}
              onMouseEnter={() => setOpenMenu(null)}
              className="rounded-full px-3 py-2 text-[15px] text-muted transition-colors hover:text-body"
            >
              {nav.docs}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href={L(nav.ctaHref)}
              className="hidden rounded-full bg-[var(--btn-bg)] px-4 py-2 text-[13px] font-semibold text-[var(--btn-text)] transition-colors hover:bg-[var(--btn-hover)] sm:inline-flex"
            >
              {nav.cta}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:text-body lg:hidden"
            >
              {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* mega panel (desktop) — contained glass, opens under the pill */}
        {active && (
          <div className="pointer-events-auto absolute inset-x-0 top-full hidden pt-2 lg:block">
            <div className="rounded-[28px] border border-line bg-glass p-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <div className="flex gap-8">
                {/* always a 2-col × 3-row grid (6 slots); empty slots preserve space */}
                <div className="grid flex-1 grid-cols-2 gap-x-10 gap-y-5">
                  {Array.from({
                    length: Math.max(6, Math.ceil(active.items.length / 2) * 2),
                  }).map((_, idx) => {
                    const item = active.items[idx] as NavItem | undefined;
                    if (!item) {
                      return (
                        <div key={`empty-${idx}`} aria-hidden className="min-h-[56px]" />
                      );
                    }
                    return (
                      <Link
                        key={item.href}
                        href={L(item.href)}
                        onClick={() => setOpenMenu(null)}
                        className="block min-h-[56px]"
                      >
                        <span className="block text-[15px] font-semibold text-ink">{item.title}</span>
                        <span className="mt-1 block text-[13px] leading-snug text-muted">{item.desc}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="w-px self-stretch bg-line" />

                <div className="flex w-[260px] shrink-0 flex-col gap-4">
                  <div className="t-h4 text-ink">{active.mega.tagline}</div>
                  <Link
                    href={L(active.mega.ctaHref)}
                    onClick={() => setOpenMenu(null)}
                    className="text-[13px] font-semibold text-accent-ink"
                  >
                    {active.mega.cta} →
                  </Link>
                  <div>
                    <div className="t-label mb-3 text-faint">{nav.recursosLabel}</div>
                    <ul className="flex flex-col gap-2.5">
                      {nav.recursos.map((r: LinkItem) => (
                        <li key={r.href}>
                          <Link
                            href={L(r.href)}
                            onClick={() => setOpenMenu(null)}
                            className="text-[14px] text-muted transition-colors hover:text-body"
                          >
                            {r.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <DotMatrix />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* mobile panel */}
        {open && (
          <div className="absolute inset-x-0 top-full pt-2 lg:hidden">
            <div className="flex max-h-[75vh] flex-col gap-5 overflow-y-auto rounded-[24px] border border-line bg-glass p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <MobileGroup title={nav.product} items={nav.productItems} L={L} onClick={() => setOpen(false)} />
              <MobileGroup title={nav.industries} items={nav.industriesItems} L={L} onClick={() => setOpen(false)} />
              <MobileGroup title={nav.company} items={nav.companyItems} L={L} onClick={() => setOpen(false)} />
              <Link
                href={L(nav.docsHref)}
                className="text-[15px] font-medium text-body"
                onClick={() => setOpen(false)}
              >
                {nav.docs}
              </Link>
              <Link
                href={L(nav.ctaHref)}
                className="inline-flex items-center justify-center rounded-full bg-[var(--btn-bg)] px-4 py-3 text-[14px] font-semibold text-[var(--btn-text)]"
                onClick={() => setOpen(false)}
              >
                {nav.cta}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function MobileGroup({
  title,
  items,
  L,
  onClick,
}: {
  title: string;
  items: NavItem[];
  L: (href: string) => string;
  onClick: () => void;
}) {
  return (
    <div>
      <div className="t-label mb-2 text-faint">{title}</div>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={L(item.href)}
              onClick={onClick}
              className="block py-2 text-[15px] text-body"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
