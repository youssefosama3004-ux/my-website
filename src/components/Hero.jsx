const HERO_IMAGE = "/images/youssef-hero-fullbleed.png";

export default function Hero() {
  return (
    <section
      className="hero-shell relative w-full max-w-[100vw] overflow-hidden bg-[#0A0A0A]"
      style={{
        "--text-primary": "#ffffff",
        "--text-secondary": "rgba(255, 255, 255, 0.72)",
        "--bg-surface": "rgba(255, 255, 255, 0.1)",
      }}
    >
      <picture className="hero-photo-frame">
        <source media="(max-width: 767px)" srcSet={HERO_IMAGE} />
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          className="hero-photo"
          draggable={false}
        />
      </picture>

      <div className="hero-marquee-window pointer-events-none absolute left-0 right-0 -translate-y-1/2 overflow-hidden">
        <div className="marquee-track flex w-max whitespace-nowrap">
          <span className="hero-wordmark">Youssef Kader UX Specialist&nbsp;&nbsp;&nbsp;</span>
          <span className="hero-wordmark" aria-hidden="true">Youssef Kader UX Specialist&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      <picture className="hero-photo-frame">
        <source media="(max-width: 767px)" srcSet={HERO_IMAGE} />
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          className="hero-photo hero-photo--masked"
          draggable={false}
        />
      </picture>

      <div
        aria-hidden
        className="hero-desktop-overlay pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, rgba(10, 10, 10, 0.55) 0%, transparent 22%, transparent 55%, #0A0A0A 96%),
            radial-gradient(ellipse 90% 90% at 50% 40%, transparent 55%, rgba(10, 10, 10, 0.85) 100%)
          `,
        }}
      />

      <div aria-hidden className="hero-compact-overlay pointer-events-none absolute inset-x-0 top-0" />

      <div className="hero-content relative z-[1101] flex w-full min-w-0 flex-col items-center justify-end text-center">
        <h1 className="max-w-[18rem] text-2xl font-bold leading-tight text-[var(--text-primary)] sm:max-w-none sm:text-3xl md:text-5xl">
          <span className="block md:inline">UX Specialist &amp;</span>{" "}
          <span className="block md:inline">Product Designer</span>
        </h1>
        <p className="mt-3 max-w-[18rem] text-xs uppercase leading-relaxed tracking-[0.16em] text-[var(--text-secondary)] sm:max-w-none sm:text-sm md:text-base md:tracking-[0.25em]">
          <span className="block md:inline">Designing</span>{" "}
          <span className="block md:inline">conversion-focused</span>{" "}
          <span className="block md:inline">digital products</span>
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
            Book a call &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
