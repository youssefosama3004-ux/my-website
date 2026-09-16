import { ArrowUpRight, LockKeyhole } from "lucide-react";
import FlipAction from "./ui/FlipAction.jsx";
import GradientWaves from "./GradientWaves.jsx";

export default function ConfidentialWork() {
  return (
    <section
      id="confidential-work"
      aria-labelledby="confidential-work-title"
      className="relative overflow-hidden border-b border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--surface)_92%,var(--hero-bg))] py-24 sm:py-32"
    >
      <div aria-hidden="true" className="confidential-work-wave-fallback pointer-events-none absolute inset-0 z-0" />
      <GradientWaves
        className="pointer-events-none absolute inset-0 z-[1] opacity-50 mix-blend-screen"
        horizonColor="#172554"
        waveColor="#2563eb"
        crestColor="#93c5fd"
        speed={0.22}
        amplitude={1.4}
        waveScale={0.52}
        brightness={1.1}
        opacity={0.5}
        grain={0.025}
      />
      <div className="site-container relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            <LockKeyhole size={15} strokeWidth={1.8} aria-hidden="true" />
            Confidential work
          </div>

          <div>
            <h2
              id="confidential-work-title"
              className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-fg sm:text-5xl lg:text-6xl"
            >
              Selected work is confidential
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-secondary sm:text-lg">
              Much of my recent work is covered by NDA. Public case studies are in progress, but I’m happy to discuss relevant work, process, and outcomes in a private conversation.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <FlipAction
                as="a"
                href="#contact"
                backLabel="Let’s talk →"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-bold tracking-wide text-[var(--accent-fg)] transition-colors duration-300 hover:bg-[var(--color-blue-600)] hover:text-white font-[family-name:var(--font-display)]"
              >
                Discuss your project <span aria-hidden="true">&rarr;</span>
              </FlipAction>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-fg transition-colors hover:text-accent dark:hover:text-[var(--color-blue-300)]"
              >
                Request a private walkthrough <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}