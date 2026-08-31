import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We talk through what you're building, who it's for, and what's actually getting in the way.",
  },
  {
    number: "02",
    title: "Scope",
    description:
      "I turn that conversation into a clear plan — what gets designed, in what order, and by when.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Design and development happen in tight loops, with progress shared as it happens, not at the end.",
  },
  {
    number: "04",
    title: "Handoff",
    description:
      "You get final files, a working product, and everything you need to keep moving without me.",
  },
];

export default function HowIWork() {
  return (
    <section
      id="how-i-work"
      className="relative overflow-hidden border-t border-[var(--border-default)] bg-[var(--bg-elevated)] py-24 md:py-32"
    >
      <div className="site-container relative z-10">
        <div className="flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full bg-[var(--eyebrow-dot)]"
            aria-hidden="true"
          />
          <h3 className="text-sm uppercase tracking-widest text-[var(--text-primary)] md:text-base">
            How I Work
          </h3>
        </div>

        <div className="relative mt-16 md:mt-20">
          <div className="process-steps-grid grid grid-cols-1 lg:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="process-step-card relative grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] items-start gap-5 rounded-2xl border border-[color-mix(in_srgb,var(--text-primary)_8%,transparent)] bg-[var(--bg-card)] p-[var(--process-card-padding)] lg:flex lg:flex-col lg:items-center lg:text-center"
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-blue-500)]">
                  <span className="text-xl font-bold tabular-nums text-[var(--bg-primary)] dark:text-white font-[family-name:var(--font-display)]">
                    {step.number}
                  </span>
                </div>

                <div className="min-w-0">
                  <ScrollReveal
                    baseOpacity={0.2}
                    enableBlur={false}
                    baseRotation={0}
                    rotationEnd="bottom 80%"
                    wordAnimationEnd="bottom 80%"
                    containerClassName="text-2xl font-bold tracking-wide text-[var(--text-primary)] font-[family-name:var(--font-display)]"
                    as="h4"
                  >
                    {step.title}
                  </ScrollReveal>
                  <ScrollReveal
                    baseOpacity={0.35}
                    enableBlur={false}
                    baseRotation={0}
                    rotationEnd="bottom 80%"
                    wordAnimationEnd="bottom 80%"
                    containerClassName="mt-4 text-base leading-relaxed text-[var(--text-secondary)] font-[family-name:var(--font-sans)]"
                    as="p"
                  >
                    {step.description}
                  </ScrollReveal>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
