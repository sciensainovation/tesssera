// Tessera wordmark — theme-aware. Dark-text lockup on light backgrounds,
// white-text lockup on dark. Both PNGs share the same footprint (~2.2:1);
// CSS (.tessera-logo-light / -dark) swaps them by [data-theme].
export function TesseraLogo({ className }: { className?: string }) {
  const cls = `w-auto ${className ?? ""}`.trim();
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Tessera/tessera-light.png"
        alt="Tessera"
        width={288}
        height={131}
        className={`tessera-logo-light ${cls}`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Tessera/tessera-dark.png"
        alt="Tessera"
        width={292}
        height={131}
        className={`tessera-logo-dark ${cls}`}
      />
    </>
  );
}
