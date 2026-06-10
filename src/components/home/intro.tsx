import { Container } from "@/components/ui/container";
import { LazyVideo } from "@/components/ui/lazy-video";

// copy verbatim from Figma reworkhome 2 (typo "complience" -> "compliance")
const HEADING =
  "Uma plataforma que cuida de toda a camada enterprise compliance. Analise, construa e escale.";

const FEATURES: ReadonlyArray<{ title: string; desc: string; video: string }> = [
  {
    title: "Maturidade Runtime",
    desc: "Atinja a maturidade runtime e saia na frente de 80% dos projetos de agentes.",
    video: "/Videos/data.mp4",
  },
  {
    title: "FrameWork",
    desc: "Tessera é um FrameWork 100% pensado para a camada Enterprise",
    video: "/Videos/team-bg.mp4",
  },
  {
    title: "Crescimento",
    desc: "Expansão de 10x o volume de runs/mês em 2026",
    video: "/Videos/sim.mp4",
  },
];

export function Intro() {
  return (
    <section className="py-24 md:py-32">
      <Container className="flex flex-col items-center gap-16 md:gap-24">
        <h2 className="t-h2 max-w-[760px] text-center text-ink" data-animate="fade-up">
          {HEADING}
        </h2>

        {/* alternating landscape video / text feature rows (Figma: 700x600 media) */}
        <div className="flex w-full flex-col gap-16 md:gap-24">
          {FEATURES.map((f, idx) => {
            const imageLeft = idx % 2 === 0;
            return (
              <div
                key={f.title}
                className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-12"
                data-animate="fade-up"
              >
                <div
                  className={`aspect-[7/6] w-full shrink-0 overflow-hidden rounded-[32px] border border-line bg-surface md:aspect-auto md:h-[600px] md:w-full md:max-w-[700px] md:flex-1 ${
                    imageLeft ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <LazyVideo
                    src={f.video}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div
                  className={`flex flex-col md:w-[439px] md:shrink-0 ${
                    imageLeft ? "md:order-2" : "md:order-1 md:text-right"
                  }`}
                >
                  <h3 className="text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-[-0.8px] text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[20px] leading-[1.3] text-muted">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
