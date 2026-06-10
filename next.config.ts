import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. Without it, Next infers the root
  // from a stray lockfile higher up (C:\Users\guilh), which makes Turbopack
  // build chunk names from the accented ancestor path ("…\Área de Trabalho\…")
  // and panic slicing the multi-byte "Á". cwd is always this project at build.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
