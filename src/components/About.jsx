import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[var(--bg-about)] px-6 py-24 md:py-32"
      style={{
        "--text-primary": "var(--color-grey-0)",
        "--text-secondary": "var(--color-grey-100)",
        "--border-default": "color-mix(in_srgb,var(--color-grey-0)_20%,transparent)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full bg-[var(--color-grey-100)]"
            aria-hidden="true"
          />
          <p className="text-sm uppercase tracking-widest text-[var(--text-primary)] md:text-base">
            About me
          </p>
        </div>

        <div className="mb-24 max-w-5xl md:mb-32">
          <ScrollReveal
            baseOpacity={0.15}
            enableBlur={true}
            baseRotation={0}
            blurStrength={4}
            wordAnimationEnd="bottom center"
            rotationEnd="bottom center"
            containerClassName="text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl"
          >
            A product designer who started in code, crossed into UX, and never
            stopped shipping for founders, startups, and teams who need things
            that actually work.
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <p className="max-w-md text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
              [DUMMY] Crafting digital products that combine strategy, design,
              and code to help teams move from rough idea to shipped, working
              software.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-8 md:col-span-6 md:col-start-7 md:grid-cols-3">
            <div className="flex flex-col items-start gap-3 border-t border-[var(--color-grey-100)] pt-6">
              <p className="shrink-0 text-4xl font-semibold tabular-nums text-[var(--text-primary)] md:text-6xl">
                98%
              </p>
              <p className="text-sm leading-snug text-[var(--text-secondary)] md:text-base">
                Clients satisfied and repeating
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 border-t border-[var(--color-grey-100)] pt-6">
              <p className="shrink-0 text-4xl font-semibold tabular-nums text-[var(--text-primary)] md:text-6xl">
                125+
              </p>
              <p className="text-sm leading-snug text-[var(--text-secondary)] md:text-base">
                Projects completed across industries
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 border-t border-[var(--color-grey-100)] pt-6">
              <p className="shrink-0 text-4xl font-semibold tabular-nums text-[var(--text-primary)] md:text-6xl">
                4
              </p>
              <p className="text-sm leading-snug text-[var(--text-secondary)] md:text-base">
                Active projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
