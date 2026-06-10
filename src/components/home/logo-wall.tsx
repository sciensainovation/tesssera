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

const HOLD = 2600; // ms each set stays still
const SLIDE = 620; // ms slide-up duration

function LogoImg({
  entry,
  maxH,
}: {
  entry: readonly [string, string];
  maxH: string;
}) {
  const [name, file] = entry;
  return (
    <div className="flex h-1/2 items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/logos/${file}`}
        alt={name}
        className={`logo-mono w-auto max-w-full object-contain opacity-70 ${maxH}`}
      />
    </div>
  );
}

// Sliding reel: shows `visible` logos at a time, slides up to cycle through all.
function LogoReel({
  visible,
  slotH,
  maxH,
  className,
}: {
  visible: number;
  slotH: string;
  maxH: string;
  className: string;
}) {
  const [base, setBase] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let slide: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setAnimating(true);
      slide = setTimeout(() => {
        setBase((b) => (b + visible) % LOGOS.length);
        setAnimating(false);
      }, SLIDE);
    }, HOLD + SLIDE);
    return () => {
      clearInterval(id);
      clearTimeout(slide);
    };
  }, [visible]);

  return (
    <div className={className}>
      {Array.from({ length: visible }).map((_, i) => {
        const cur = LOGOS[(base + i) % LOGOS.length];
        const nxt = LOGOS[(base + visible + i) % LOGOS.length];
        return (
          <div key={i} className={`relative overflow-hidden ${slotH}`}>
            <div
              className="flex h-[200%] flex-col"
              style={{
                transform: animating ? "translateY(-50%)" : "translateY(0)",
                transition: animating
                  ? `transform ${SLIDE}ms cubic-bezier(0.4,0,0.2,1)`
                  : "none",
              }}
            >
              <LogoImg entry={cur} maxH={maxH} />
              <LogoImg entry={nxt} maxH={maxH} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function LogoWall() {
  return (
    <div className="rounded-[32px] border border-line bg-glass px-6 pb-9 pt-[60px] shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-xl md:px-12 md:pb-11">
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
        {STATS.map((s) => (
          <p
            key={s}
            className="t-label text-center text-body md:text-base md:font-normal md:tracking-normal"
          >
            {s}
          </p>
        ))}
      </div>

      {/* mobile: 2x2 grid, bigger logos */}
      <LogoReel
        visible={4}
        slotH="h-[96px]"
        maxH="max-h-[68px]"
        className="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-4 md:hidden"
      />
      {/* desktop: single row of 5 */}
      <LogoReel
        visible={5}
        slotH="h-[75px]"
        maxH="max-h-[51px]"
        className="mt-[75px] hidden grid-cols-5 items-center gap-x-12 md:grid"
      />
    </div>
  );
}
