"use client";

import { useEffect, useRef } from "react";

/**
 * Background video that only plays while on screen (and pauses off screen),
 * lazy-loading its source on first approach. Keeps the number of videos
 * decoding at once low and avoids loading off-screen media up front.
 */
export function LazyVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let loaded = false;
    const ensureSrc = () => {
      if (!loaded) {
        el.src = src;
        el.load();
        loaded = true;
      }
    };

    // reduced motion: load a still first frame, never autoplay
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ensureSrc();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          ensureSrc();
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "300px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
    />
  );
}
