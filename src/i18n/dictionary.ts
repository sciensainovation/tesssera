// Client-safe Dictionary type (no `server-only` import), derived from the PT
// dictionary shape. Use `import type { Dictionary }` from here in components.
import pt from "@/app/[locale]/dictionaries/pt.json";

export type Dictionary = typeof pt;
