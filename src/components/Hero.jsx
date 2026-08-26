import FlipAction from "./ui/FlipAction.jsx";
import { GravityStarsBackground } from "./ui/GravityStarsBackground";

const HERO_PORTRAIT = "/images/youssef-osama-product-designer.png";

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
      <GravityStarsBackground
        starsCount={30}
        starsSize={1.35}
        starsOpacity={0.32}
        glowIntensity={8}
        movementSpeed={0.12}
        mouseInfluence={130}
        gravityStrength={42}
        className="hero-gravity-stars"
      />
      <div aria-hidden className="hero-visual-overlay" />

      <div className="hero-marquee-window pointer-events-none absolute left-0 right-0 -translate-y-1/2 overflow-hidden">
        <div className="marquee-track flex w-max whitespace-nowrap">
          <span className="hero-wordmark">YOUSSEF KADER · PRODUCT DESIGNER&nbsp;&nbsp;&nbsp;</span>
          <span className="hero-wordmark" aria-hidden="true">YOUSSEF KADER · PRODUCT DESIGNER&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      <picture className="hero-portrait-zone">
        <img
          src={HERO_PORTRAIT}
          alt="Youssef Osama - Product Designer"
          className="hero-portrait"
          draggable={false}
        />
      </picture>

      <div className="site-container hero-content relative z-[1101] min-w-0">
        <div className="hero-copy">
          <p className="mb-3 text-[11px] font-medium tracking-[0.08em] text-white/60 sm:text-xs">
            Product designer who ships what he designs
          </p>
          <h1 className="w-4/5 text-[clamp(2.25rem,calc(1rem+1.4vw),3.25rem)] font-bold leading-tight text-[#F2F2F2]">
            I turn messy ideas into products people can actually use.
          </h1>
          <p className="mt-3 max-w-[23rem] text-[length:var(--text-body-sm)] leading-[1.65] tracking-normal text-white/80 sm:max-w-[29rem] md:text-[16px]">
            Fewer steps, less confusion, and a flow where people always know
            what&apos;s next. I design it, I build it, and I don&apos;t disappear
            after launch.
          </p>
        </div>
        <div className="hero-actions flex w-full max-w-[23rem] flex-col items-center justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <a
            href="#work"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[var(--text-secondary)] px-6 text-base font-bold tracking-wide text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--text-primary)] hover:bg-[var(--bg-surface)] sm:w-auto sm:text-sm lg:text-[length:var(--text-body-md)] lg:leading-[var(--text-body-md--line-height)] font-[family-name:var(--font-display)]"
          >
            View my work
          </a>
          <FlipAction
            as="a"
            href="#contact"
            backLabel="Let’s talk →"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--color-blue-500)] px-6 text-base font-bold tracking-wide text-white transition-colors duration-300 sm:w-auto sm:bg-white sm:text-sm sm:text-[#0A0A0A] sm:hover:bg-[var(--color-blue-500)] sm:hover:text-white lg:text-[length:var(--text-body-md)] lg:leading-[var(--text-body-md--line-height)] font-[family-name:var(--font-display)]"
          >
            Book a call <span aria-hidden="true">&rarr;</span>
          </FlipAction>
        </div>
      </div>
    </section>
  );
}
