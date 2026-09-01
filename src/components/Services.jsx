const services = [
  {
    kicker: "Connection",
    title: "Product Design",
    desc: "End-to-end product design — research, journeys, IA, wireframes, and high-fidelity UI for web and mobile products that convert.",
    image: "/images/services/product-design.png",
  },
  {
    kicker: "Development",
    title: "Web Development",
    desc: "I build what I design. Same person, same week — no handoff, no waiting on dev. The site goes live looking exactly like the comp.",
    image: "/images/services/web-development.png",
  },
  {
    kicker: "Conversion",
    title: "Ecommerce",
    desc: "Conversion-focused online stores — storefront UX, product pages, and checkout flows designed and built to turn visitors into customers.",
    image: "/images/services/ecommerce.png",
  },
  {
    kicker: "Direction",
    title: "UX Consulting",
    desc: "Expert UX strategy, audits, and design-thinking workshops — tailored guidance to sharpen journeys and align design with business goals.",
    image: "/images/services/ux-consulting.png",
  },
];

const tools = [
  { slug: "figma", label: "Figma" },
  { slug: "chatgpt", label: "ChatGPT" },
  { slug: "gemini", label: "Gemini" },
  { slug: "claude", label: "Claude" },
  { slug: "vscode", label: "Visual Studio Code" },
  { slug: "clickup", label: "ClickUp" },
  { slug: "uxpilot", label: "UX Pilot" },
  { slug: "photoshop", label: "Adobe Photoshop" },
  { slug: "illustrator", label: "Adobe Illustrator" },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-[color-mix(in_srgb,var(--color-accent-2)_12%,transparent)] bg-[var(--bg-elevated)] py-24 md:py-32"
    >
      <div className="site-container">
        <div className="mb-12 flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full bg-[var(--eyebrow-dot)]"
            aria-hidden="true"
          />
          <h3 className="text-sm uppercase tracking-widest text-[var(--text-primary)] md:text-base">
            What I do
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group relative isolate flex min-h-[28rem] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--color-blue-500)_55%,var(--border-default))] md:min-h-[30rem] md:p-7 xl:min-h-[32rem]"
            >
              <img
                src={service.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 -z-20 h-full w-full scale-105 object-cover opacity-100 transition-all duration-700 ease-out group-hover:scale-100 lg:opacity-0 lg:group-hover:opacity-100"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/25 to-black/90 opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100"
              />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/65 transition-colors duration-500 lg:text-[var(--text-muted)] lg:group-hover:text-white/65">
                    {service.kicker}
                  </p>
                  <h4 className="mt-2 max-w-[12rem] text-3xl font-semibold leading-[0.95] tracking-tight text-white transition-colors duration-500 lg:text-[var(--text-primary)] lg:group-hover:text-white">
                    {service.title}
                  </h4>
                </div>
                <span className="text-xs font-medium tabular-nums text-white/55 transition-colors duration-500 lg:text-[var(--text-muted)] lg:group-hover:text-white/55">
                  0{index + 1}
                </span>
              </div>

              <p className="relative max-w-sm text-sm leading-relaxed text-white/85 transition-colors duration-500 lg:text-[var(--text-secondary)] lg:group-hover:text-white/85 md:text-base">
                {service.desc}
              </p>
            </article>
          ))}
        </div>

        <div className="services-feature-grid mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="services-feature-card services-platform-card relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 text-fg md:p-10">
            <h3 className="mb-3 text-center text-2xl font-bold text-fg md:text-3xl">
              Built on the right platform
            </h3>
            <p className="mx-auto max-w-md text-center text-base leading-relaxed text-fg-secondary">
              WordPress, Shopify, Salla, Webflow, or custom React — I pick the
              platform that fits your goals, budget, and how you'll run it
              after launch. No forcing every project into one stack.
            </p>

            <div className="services-platform-icons mt-8 flex flex-wrap items-center justify-center gap-5 md:gap-6">
              {["wordpress", "shopify", "salla", "webflow", "react"].map(
                (platform) => (
                  <div
                    key={platform}
                    className="group/platform relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-grey-100)] bg-[var(--color-grey-50)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-grey-200)] hover:shadow-sm"
                  >
                    <img
                      src={`/logos/platforms/${platform}.svg`}
                      alt={platform}
                      className="h-6 w-6 object-contain transition-opacity duration-300 group-hover/platform:opacity-0"
                      onError={(event) => {
                        event.currentTarget.style.opacity = "0.25";
                      }}
                    />
                    <img
                      src={`/logos/platforms/color/${platform}.svg`}
                      alt=""
                      aria-hidden="true"
                      className="absolute h-6 w-6 object-contain opacity-0 transition-opacity duration-300 group-hover/platform:opacity-100"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="services-feature-card relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 text-fg md:p-10">
            <h3 className="mb-3 text-center text-xs uppercase tracking-widest text-fg-secondary">
              AI-first, not AI generated
            </h3>
            <h3 className="mb-3 text-center text-2xl font-bold text-fg md:text-3xl">
              Tools and workflows
            </h3>
            <p className="mx-auto mb-10 max-w-sm text-center text-base leading-relaxed text-fg-secondary">
              The right mix of strategy, design, AI, and engineering — based on
              what needs to ship.
            </p>

            <div className="relative mt-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="flex w-max gap-4 animate-tools-marquee">
                {[...Array(2)].map((_, duplicateIndex) => (
                  <div key={duplicateIndex} className="flex shrink-0 gap-4">
                    {tools.map((tool) => (
                      <div
                        key={tool.slug}
                        className="group/tool flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-grey-100)] bg-[var(--color-grey-50)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-grey-200)] hover:shadow-sm"
                      >
                        <img
                          src={`/logos/tools/${tool.slug}.svg`}
                          alt={tool.label}
                          className="h-7 w-7 object-contain brightness-0 transition-all duration-300 group-hover/tool:brightness-100"
                          onError={(event) => {
                            event.currentTarget.style.opacity = "0.2";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
