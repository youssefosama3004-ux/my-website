const HERO_AURORA = "/images/hero-aurora.png";
const HERO_PORTRAIT = "/images/youssef-product-design-v3.png";

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
      <img
        src={HERO_AURORA}
        alt=""
        aria-hidden
        className="hero-aurora"
        draggable={false}
      />

      <div aria-hidden className="hero-visual-overlay" />

      <div className="hero-marquee-window pointer-events-none absolute left-0 right-0 -translate-y-1/2 overflow-hidden">
        <div className="marquee-track flex w-max whitespace-nowrap">
          <span className="hero-wordmark">Youssef Kader UX Specialist&nbsp;&nbsp;&nbsp;</span>
          <span className="hero-wordmark" aria-hidden="true">Youssef Kader UX Specialist&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      <picture className="hero-portrait-zone">
        <img
          src={HERO_PORTRAIT}
          alt=""
          aria-hidden
          className="hero-portrait"
          draggable={false}
        />
      </picture>

      <div className="hero-content relative z-[1101] flex w-full min-w-0 flex-col items-center justify-end text-center">
        <h1 className="max-w-[22rem] text-[clamp(2.275rem,4.2vw,3.75rem)] font-bold leading-tight text-[var(--text-primary)] sm:max-w-none">
          Business-Minded Product Designer
        </h1>
        <p className="mt-3 max-w-[23rem] text-[length:var(--text-body-sm)] leading-[1.65] tracking-normal text-white/80 sm:max-w-[38rem] md:max-w-[48rem] md:text-xl">
          I help startups turn messy ideas into clear digital products
          <br className="hidden sm:block" /> people can actually use.
        </p>
        <div className="mt-5 flex w-full max-w-[23rem] flex-col items-center justify-center gap-3 sm:mt-8 sm:w-auto sm:max-w-none sm:flex-row">
          <a
            href="#work"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[var(--text-secondary)] px-6 text-sm font-bold tracking-wide text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--text-primary)] hover:bg-[var(--bg-surface)] sm:w-auto lg:text-[length:var(--text-body-md)] lg:leading-[var(--text-body-md--line-height)] font-[family-name:var(--font-display)]"
          >
            View my work
          </a>
          <a
            href="https://calendly.com/YOUR-LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--color-blue-500)] px-6 text-sm font-bold tracking-wide text-white transition-transform duration-300 hover:scale-105 sm:w-auto lg:text-[length:var(--text-body-md)] lg:leading-[var(--text-body-md--line-height)] font-[family-name:var(--font-display)]"
          >
            Book a call &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
