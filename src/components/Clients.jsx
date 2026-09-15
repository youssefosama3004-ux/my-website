import LogoLoop from "./LogoLoop/LogoLoop";

const clientLogos = [
  { src: "/logos/dp-world.svg", alt: "DP World" },
  { src: "/logos/dubai-trade.svg", alt: "Dubai Trade" },
  { src: "/logos/aabe.svg", alt: "AABE" },
  {
    src: "/logos/invoice-brokers.svg",
    alt: "Invoice Brokers",
  },
  { src: "/logos/winveston.svg", alt: "WinVeston" },
  { src: "/logos/shaha.svg", alt: "Shaha" },
  { src: "/logos/koolen.svg", alt: "Koolen" },
  { src: "/logos/tamheed.svg", alt: "Tamheed" },
  { src: "/logos/ldc.svg", alt: "LDC" },
  { src: "/logos/unique.svg", alt: "Unique" },
];

export default function Clients() {
  return (
    <section
      className="clients-section relative overflow-hidden py-12 md:py-32"
      style={{ backgroundColor: "var(--clients-section-bg)" }}
    >
      {/* Centered label crossing a full-width divider */}
      <div className="relative mb-12 flex items-center justify-center md:mb-16">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[var(--border-default)]"
        />
        <h2 className="relative z-10 rounded-full bg-[var(--clients-label-bg)] px-6 py-3 text-center text-xs font-semibold text-[var(--clients-label-text)] md:px-7 md:text-sm">
          Who I&apos;ve built for
        </h2>
      </div>

      <div className="site-container">
        {/* Logo loop */}
        <div className="logo-loop-wrapper text-[var(--text-secondary)]">
          <LogoLoop
            logos={clientLogos}
            speed={60}
            direction="left"
            logoHeight={40}
            gap={80}
            pauseOnHover
            fadeOut
            fadeOutColor="var(--clients-section-bg)"
            ariaLabel="Clients I have worked with"
          />
        </div>
      </div>
    </section>
  );
}
