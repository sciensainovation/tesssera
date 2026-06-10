export function Placeholder({
  label,
  ratio = "16 / 7",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      data-animate="fade-in"
      style={{ aspectRatio: ratio }}
      className={`dot-grid flex w-full items-center justify-center rounded-sm border border-line bg-surface ${className}`}
    >
      <span className="t-label px-4 text-center text-faint">{label}</span>
    </div>
  );
}
