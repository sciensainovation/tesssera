import type { ReactNode } from "react";

export function SectionHeading({
  title,
  sub,
  accent = false,
  align = "center",
  className = "",
}: {
  title: ReactNode;
  sub?: string;
  accent?: boolean;
  align?: "center" | "left";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div
      className={`flex flex-col ${
        center ? "mx-auto max-w-[760px] items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {accent ? <div className="accent-line mb-6" data-animate="fade-in" /> : null}
      <h2 className="t-h2 text-ink" data-animate="fade-up-slow">
        {title}
      </h2>
      {sub ? (
        <p className="section-sub mt-4" data-animate="fade-up">
          {sub}
        </p>
      ) : null}
    </div>
  );
}
