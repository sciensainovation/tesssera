import "server-only";
import type { Locale } from "@/i18n/config";
import pt from "./dictionaries/pt.json";
import en from "./dictionaries/en.json";

const dictionaries = { pt, en } as const;

export type Dictionary = typeof pt;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  (dictionaries[locale] ?? dictionaries.pt) as Dictionary;
