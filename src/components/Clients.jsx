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
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-sm md:text-base uppercase tracking-widest text-[var(--text-secondary)] mb-12 text-center">
          I've worked with
        </h2>

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
