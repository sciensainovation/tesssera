import Link from "next/link";
import { type Locale, localizedHref } from "@/i18n/config";

export type DocBlock = {
  t: string;
  text?: string;
  items?: (string | { b: string; text: string })[];
  lines?: string[];
  links?: { label: string; href: string }[];
  alt?: string;
};

export function DocBlocks({
  blocks,
  locale,
}: {
  blocks: DocBlock[];
  locale: Locale;
}) {
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.t) {
          case "h2":
            return (
              <h2 key={i} className="t-h4 mt-10 text-ink first:mt-6">
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p
                key={i}
                className="mt-4 text-[15px] leading-relaxed text-muted"
              >
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-4 flex flex-col gap-2">
                {block.items?.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[15px] leading-relaxed text-muted"
                  >
                    <span aria-hidden className="mt-[2px] text-faint">
                      ·
                    </span>
                    <span>
                      {typeof item === "string" ? (
                        item
                      ) : (
                        <>
                          <strong className="font-medium text-ink">
                            {item.b}
                          </strong>
                          {item.text}
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={i}
                className="t-mono mt-4 overflow-x-auto rounded-sm border border-line bg-surface p-4 text-[13px] leading-relaxed text-body"
              >
                <code>{block.lines?.join("\n")}</code>
              </pre>
            );
          case "links":
            return (
              <ul key={i} className="mt-4 flex flex-col gap-2">
                {block.links?.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={localizedHref(link.href, locale)}
                      className="inline-flex items-center gap-1 text-[14px] font-medium text-accent-ink hover:underline"
                    >
                      {link.label}
                      <span aria-hidden>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            );
          case "img":
            return (
              <div
                key={i}
                className="dot-grid mt-6 flex aspect-[16/6] w-full items-center justify-center rounded-sm border border-line bg-surface"
              >
                <span className="t-label px-4 text-center text-faint">
                  {block.alt}
                </span>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
