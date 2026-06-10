import type { ReactNode } from "react";

export function Section({
  id,
  invert = false,
  className = "",
  children,
}: {
  id?: string;
  invert?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${invert ? "theme-invert " : ""}py-16 md:py-[120px] ${className}`}
    >
      {children}
    </section>
  );
}
