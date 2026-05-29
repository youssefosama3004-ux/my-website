import RotatingText from "./RotatingText";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Figma-style grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-minor) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-minor) 1px, transparent 1px),
            linear-gradient(to right, var(--grid-major) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-major) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px, 8px 8px, 80px 80px, 80px 80px"
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* LEFT — Text content (60% on desktop = 7/12 cols) */}
        <div className="md:col-span-7 text-left">
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--text-primary)] leading-[1.1] flex flex-wrap items-baseline gap-x-3">
            <span>I make your idea</span>
            <RotatingText
              texts={["real", "shipped", "live", "launched"]}
              rotationInterval={3000}
              staggerDuration={0.025}
              splitBy="characters"
              mainClassName="inline-block"
              splitLevelClassName="overflow-hidden"
              elementLevelClassName="aurora-char"
              transition={{ type: "spring", damping: 35, stiffness: 150 }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
            />
            <span>.</span>
          </h1>

          {/* Name + role block */}
          <div className="mt-5 leading-snug">
            <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">Hi, I am Youssef</h3>
            <h3 className="text-lg md:text-xl font-normal text-[var(--text-secondary)]">UX Specialist at egabi Solutions</h3>
          </div>

          {/* Supporting line */}
          <p className="mt-3 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
            Helping startups and agencies design conversion-focused products — from research to shipped product.
          </p>

          {/* CTA group — primary + secondary */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--text-secondary)] text-[var(--text-primary)] font-medium transition-all duration-300 hover:bg-[var(--bg-surface)] hover:border-[var(--text-primary)]"
            >
              View my work
            </a>
            <a
              href="https://calendly.com/YOUR-LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-blue-500)] text-white font-medium transition-transform duration-300 hover:scale-105"
            >
              Book a call →
            </a>
          </div>
        </div>

        {/* RIGHT — Photo (40% on desktop = 5/12 cols) with slight upward offset */}
        <div className="md:col-span-5 flex justify-center md:justify-end md:-mt-12">
          <div className="w-72 md:w-full max-w-md aspect-[4/5] relative">
            <img
              src="/images/youssef-hero.jpg"
              alt="Youssef-UX-Designer"
              className="w-full h-full object-cover"
              draggable={false}
              style={{
                maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Availability indicator (bottom-right) */}
      <div className="fixed bottom-[80px] right-[40px] z-[1200] flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
        Available for Q3 work
      </div>
    </section>
  );
}
