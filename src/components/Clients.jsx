import LogoLoop from "./LogoLoop/LogoLoop";

const clientLogos = [
  { src: "/logos/dp-world.svg", alt: "DP World", href: "#" },
  { src: "/logos/dubai-trade.svg", alt: "Dubai Trade", href: "#" },
  { src: "/logos/aabe.svg", alt: "AABE", href: "#" },
  {
    src: "/logos/invoice-brokers.svg",
    alt: "Invoice Brokers",
    href: "#",
  },
  { src: "/logos/winveston.svg", alt: "WinVeston", href: "#" },
];

export default function Clients() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
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
            scaleOnHover
            fadeOut
            fadeOutColor="var(--bg-primary)"
            ariaLabel="Clients I have worked with"
          />
        </div>
      </div>
    </section>
  );
}
