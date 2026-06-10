"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, localizedHref } from "@/i18n/config";

type Group = { title: string; items: { label: string; href: string }[] };

export function DocsSidebar({
  groups,
  locale,
}: {
  groups: Group[];
  locale: Locale;
}) {
  const pathname = usePathname();

  const nav = (
    <nav className="flex flex-col gap-7">
      {groups.map((group) => (
        <div key={group.title}>
          <div className="t-label mb-3 text-faint">{group.title}</div>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const href = localizedHref(item.href, locale);
              const active = pathname === href;
              return (
                <li key={item.href}>
                  <Link
                    href={href}
                    className={`block rounded-sm px-3 py-1.5 text-[14px] transition-colors ${
                      active
                        ? "bg-subtle font-medium text-ink"
                        : "text-muted hover:text-body"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <aside className="lg:w-[240px] lg:shrink-0">
      <details className="rounded-sm border border-line p-4 lg:hidden">
        <summary className="t-label cursor-pointer text-muted">
          Documentação
        </summary>
        <div className="mt-5">{nav}</div>
      </details>
      <div className="hidden lg:sticky lg:top-[84px] lg:block">{nav}</div>
    </aside>
  );
}
