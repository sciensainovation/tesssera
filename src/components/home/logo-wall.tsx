"use client";

import { useEffect, useState } from "react";

// Hero band — stats ("big numbers") + client logos, glass card overlapping the hero
const STATS = [
  "+16 ANOS DE MERCADO",
  "200 CLIENTES SERVIDOS",
  "BACEN COMPLIANCE",
  "LGPD COMPLIANCE",
];

const LOGOS: ReadonlyArray<readonly [string, string]> = [
  ["Itaú", "itau.png"],
  ["Santander", "santander.png"],
  ["PicPay", "picpay.png"],
  ["iFood", "ifood.png"],
  ["Natura", "natura.png"],
  ["Gerdau", "gerdau.png"],
  ["Genial", "genial.png"],
  ["PagoNxt", "pagonext.png"],
  ["Pluxee", "pluxee.png"],
  ["Mirae Asset", "mirae.png"],
];

const VISIBLE = 5; // slots in the single row (matches Figma grid-cols-5)
const HOLD = 2600; // ms each set stays still
const SLIDE = 620; // ms slide-up duration

function LogoImg({ entry }: { entry: readonly [string, string] }) {
  const [name, file] = entry;
  return (
    <div className="flex h-1/2 items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/logos/${file}`}
        alt={name}
        className="logo-mono max-h-[51px] w-auto max-w-full object-contain opacity-70"
      />
    </div>
  );
}

export function LogoWall() {
  const [base, setBase] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let slide: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setAnimating(true);
      slide = setTimeout(() => {
        setBase((b) => (b + VISIBLE) % LOGOS.length);
        setAnimating(false);
      }, SLIDE);
    }, HOLD + SLIDE);
    return () => {
      clearInterval(id);
      clearTimeout(slide);
    };
  }, []);

  return (
    <div className="rounded-[32px] border border-line bg-glass px-6 py-9 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-xl md:px-12 md:py-11">
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
        {STATS.map((s) => (
          <p key={s} className="text-center text-base text-body">
            {s}
          </p>
        ))}
      </div>

      {/* single-row logo reel — each slot slides up to swap (entrance + exit) */}
      <div className="mt-9 grid grid-cols-5 items-center gap-x-4 md:mt-12 md:gap-x-12">
        {Array.from({ length: VISIBLE }).map((_, i) => {
          const cur = LOGOS[(base + i) % LOGOS.length];
          const nxt = LOGOS[(base + VISIBLE + i) % LOGOS.length];
          return (
            <div key={i} className="relative h-[75px] overflow-hidden">
              <div
                className="flex h-[200%] flex-col"
                style={{
                  transform: animating ? "translateY(-50%)" : "translateY(0)",
                  transition: animating
                    ? `transform ${SLIDE}ms cubic-bezier(0.4,0,0.2,1)`
                    : "none",
                }}
              >
                <LogoImg entry={cur} />
                <LogoImg entry={nxt} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
