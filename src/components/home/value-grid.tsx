import type { Dictionary } from "@/i18n/dictionary";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AgentOsScene } from "@/components/home/agentos-scene";

export function ValueGrid({ dict }: { dict: Dictionary }) {
  const v = dict.value;
  const half = Math.ceil(v.items.length / 2);
  const left = v.items.slice(0, half);
  const right = v.items.slice(half);

  return (
    <Section>
      <Container>
        {/* mobile: mock on top, above everything (desktop shows it in the center column) */}
        <div className="mb-12 lg:hidden">
          <AgentOsScene />
        </div>

        <div className="flex flex-col items-center gap-5 text-center" data-animate="fade-up">
          <span className="accent-line" />
          <h2 className="t-h2 max-w-[760px] text-ink">{v.headline}</h2>
          <p className="section-sub mx-auto">{v.sub}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          {/* left column — right-aligned on desktop */}
          <div className="flex flex-col justify-between gap-10">
            {left.map((item) => (
              <div
                key={item.n}
                className="flex flex-col gap-1.5 lg:items-end lg:text-right"
              >
                <span className="t-mono text-[12px] tracking-wider text-faint">
                  {item.n}
                </span>
                <h3 className="text-[20px] font-semibold leading-tight text-ink">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* center illustration — desktop only (hidden on mobile so cards stack cleanly) */}
          <div className="hidden lg:block lg:min-h-full">
            <AgentOsScene />
          </div>

          {/* right column — left-aligned */}
          <div className="flex flex-col justify-between gap-10">
            {right.map((item) => (
              <div key={item.n} className="flex flex-col gap-1.5">
                <span className="t-mono text-[12px] tracking-wider text-faint">
                  {item.n}
                </span>
                <h3 className="text-[20px] font-semibold leading-tight text-ink">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
