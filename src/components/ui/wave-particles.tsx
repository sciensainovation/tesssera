"use client";

import { useEffect, useRef } from "react";

// Wave-particle field (ported from the wave-particles mock): a grid of squares
// whose size + alpha ripple out from moving wave sources. Painted in the brand
// color (read from --color-brand). Honors reduced-motion (single static frame).
const CONFIG = {
  cols: 28,
  numSources: 3,
  maxSize: 10,
  speed: 1,
  waveLen: 4,
};

function brandRgb(): string {
  const hex = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-brand")
    .trim()
    .replace("#", "");
  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  return "0, 106, 129";
}

export function WaveParticles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const color = brandRgb();
    let t = 0;
    let W = 0;
    let H = 0;
    let sources: { x: number; y: number; offset: number; speed: number }[] = [];
    let raf = 0;

    const makeSources = (n: number) => {
      sources = [];
      for (let i = 0; i < n; i++) {
        sources.push({
          x: (0.15 + Math.random() * 0.7) * W,
          y: (0.15 + Math.random() * 0.7) * H,
          offset: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 0.8,
        });
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      if (W === 0 || H === 0) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeSources(CONFIG.numSources);
    };

    const frame = () => {
      if (W === 0 || H === 0) return;
      ctx.clearRect(0, 0, W, H);
      const cols = CONFIG.cols;
      const rows = Math.max(1, Math.round(cols * (H / W)));
      const cellW = W / cols;
      const cellH = H / rows;
      const maxDiag = Math.sqrt(W * W + H * H);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5) * cellW;
          const y = (r + 0.5) * cellH;
          let sum = 0;
          for (const src of sources) {
            const sx = src.x + Math.sin(t * 0.3 + src.offset) * W * 0.12;
            const sy = src.y + Math.cos(t * 0.25 + src.offset) * H * 0.12;
            const dist = Math.sqrt((x - sx) ** 2 + (y - sy) ** 2) / maxDiag;
            const phase = dist * CONFIG.waveLen * Math.PI * 2;
            sum += Math.sin(t * CONFIG.speed * src.speed - phase + src.offset);
          }
          const norm = (sum / sources.length + 1) / 2;
          const size = 1.5 + norm * (CONFIG.maxSize - 1.5);
          const alpha = 0.08 + norm * 0.62;
          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
    };

    const loop = () => {
      frame();
      t += 0.016;
      raf = requestAnimationFrame(loop);
    };

    resize();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      frame();
    } else {
      loop();
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
