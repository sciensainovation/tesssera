export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix a locale-agnostic path (e.g. "/platform/overview") with the locale. */
export function localizedHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  return `/${locale}${href}`;
}
