export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6">
        {/* Photo zone — marquee, blue block, and photo share this center */}
        <div className="relative flex items-center justify-center">
          {/* Infinite name marquee centered on the photo zone */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 flex w-screen -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden">
            <h1 className="concept-b-marquee-track whitespace-nowrap" aria-label="Youssef Kader">
              <span className="concept-b-marquee-text font-[family-name:var(--font-display)]">Youssef Kader&nbsp;&nbsp;&nbsp;</span>
              <span className="concept-b-marquee-text font-[family-name:var(--font-display)]" aria-hidden="true">Youssef Kader&nbsp;&nbsp;&nbsp;</span>
            </h1>
          </div>

          {/* Blue block */}
          <div className="absolute left-1/2 top-1/2 z-[1] h-[330px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[var(--color-blue-500)] md:h-[380px] md:w-[300px]" />

          {/* Photo */}
          <img
            src="/images/youssef-osama-image-v3.png"
            alt="Youssef Kader"
            className="relative z-[2] h-[42vh] w-auto object-contain md:h-[50vh]"
            draggable={false}
          />
        </div>

        {/* Content stack below the photo zone */}
        <div className="relative z-10 mt-10 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-wide text-[var(--text-primary)] md:text-4xl">
            UX Specialist &amp; Product Designer
          </h2>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)] md:text-base">
            Designing conversion-focused digital products
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a
              href="#work"
              className="rounded-full border border-[var(--text-secondary)] px-5 py-2.5 text-sm font-bold tracking-wide text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--text-primary)] hover:bg-[var(--bg-surface)] font-[family-name:var(--font-display)]"
            >
              View my work
            </a>
            <a
              href="https://calendly.com/YOUR-LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--color-blue-500)] px-5 py-2.5 text-sm font-bold tracking-wide text-white transition-transform duration-300 hover:scale-105 font-[family-name:var(--font-display)]"
            >
              Book a call →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
