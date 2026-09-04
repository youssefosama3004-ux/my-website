const services = [
  {
    kicker: "Connection",
    title: "Product Design",
    desc: "End to end product design, research, journeys, IA, wireframes, and high-fidelity UI for web and mobile products that convert.",
    image: "/images/services/product-design.png",
  },
  {
    kicker: "Development",
    title: "Web Development",
    desc: "I build what I design. Same person, same week, no handoff, no waiting on dev. The site goes live looking exactly like the comp.",
    image: "/images/services/web-development.png",
  },
  {
    kicker: "Conversion",
    title: "Ecommerce",
    desc: "Conversion-focused online stores, storefront UX, product pages, and checkout flows designed and built to turn visitors into customers.",
    image: "/images/services/ecommerce.png",
  },
  {
    kicker: "Direction",
    title: "UX Consulting",
    desc: "Expert UX strategy, audits, and design-thinking workshops, tailored guidance to sharpen journeys and align design with business goals.",
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
  {
    slug: "uxpilot",
    label: "UX Pilot",
    image: "/logos/tools/uxpilot-source.png",
  },
  { slug: "photoshop", label: "Adobe Photoshop" },
  { slug: "illustrator", label: "Adobe Illustrator" },
];

const platforms = [
  { slug: "wordpress", label: "WordPress" },
  { slug: "shopify", label: "Shopify" },
  { slug: "salla", label: "Salla" },
  { slug: "webflow", label: "Webflow" },
  { slug: "react", label: "React" },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-[var(--bg-elevated)] py-12 md:py-32"
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
              className="service-card group relative isolate flex min-h-[28rem] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--color-blue-500)_55%,var(--border-default))] md:min-h-[30rem] md:p-7 xl:min-h-[32rem]"
            >
              <img
                src={service.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="service-card-image absolute inset-0 -z-20 h-full w-full scale-105 object-cover opacity-100 transition-all duration-700 ease-out group-hover:scale-100 lg:opacity-0 lg:group-hover:opacity-100"
              />
              <span
                aria-hidden="true"
                className="service-card-overlay absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/65 to-black/95 opacity-100 transition-opacity duration-500 lg:from-black/75 lg:via-black/25 lg:to-black/90 lg:opacity-0 lg:group-hover:opacity-100"
              />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="service-card-kicker text-xs font-semibold uppercase tracking-[0.16em] text-white/65 transition-colors duration-500 lg:text-[var(--text-muted)] lg:group-hover:text-white/65">
                    {service.kicker}
                  </p>
                  <h4 className="service-card-heading mt-2 max-w-[12rem] text-2xl font-semibold leading-[0.95] tracking-tight text-white transition-colors duration-500 md:text-3xl lg:text-[var(--text-primary)] lg:group-hover:text-white">
                    {service.title}
                  </h4>
                </div>
                <span className="service-card-number text-xs font-medium tabular-nums text-white/55 transition-colors duration-500 lg:text-[var(--text-muted)] lg:group-hover:text-white/55">
                  0{index + 1}
                </span>
              </div>

              <p className="service-card-description relative max-w-sm text-sm leading-relaxed text-white/85 transition-colors duration-500 lg:text-[var(--text-secondary)] lg:group-hover:text-white/85 md:text-base">
                {service.desc}
              </p>
            </article>
          ))}
        </div>

        <div className="services-feature-grid mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="services-feature-card services-platform-card relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 text-fg md:p-10">
            <h3 className="mb-3 text-center text-3xl font-bold text-fg">
              Built on the right platform
            </h3>
            <p className="mx-auto max-w-md text-center text-base leading-relaxed text-fg-secondary">
              WordPress, Shopify, Salla, Webflow, or custom React, I pick the
              platform that fits your goals, budget, and how you'll run it
              after launch. No forcing every project into one stack.
            </p>

            <div className="services-platform-icons relative mt-auto overflow-hidden pt-8 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="flex w-max gap-4 animate-tools-marquee animate-platform-marquee">
                {[...Array(2)].map((_, duplicateIndex) => (
                  <div key={duplicateIndex} className="flex shrink-0 gap-4">
                    {platforms.map((platform) => (
                      <div
                        key={platform.slug}
                        className="group/platform flex h-16 shrink-0 items-center gap-2.5 px-2"
                      >
                        <span className="relative h-7 w-7 shrink-0" aria-hidden="true">
                          <img
                            src={`/logos/platforms/${platform.slug}.svg`}
                            alt=""
                            className="platform-logo-mark-base absolute inset-0 h-7 w-7 object-contain transition-opacity duration-300 group-hover/platform:opacity-0"
                            onError={(event) => {
                              event.currentTarget.style.opacity = "0.25";
                            }}
                          />
                          <img
                            src={`/logos/platforms/color/${platform.slug}.svg`}
                            alt=""
                            className="absolute inset-0 h-7 w-7 object-contain opacity-0 transition-opacity duration-300 group-hover/platform:opacity-100"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        </span>
                        <span className="whitespace-nowrap text-sm font-normal text-[var(--text-secondary)] transition-colors duration-300 group-hover/platform:text-[var(--text-primary)] font-[family-name:var(--font-sans)]">
                          {platform.label}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="services-feature-card relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 text-fg md:p-10">
            <h3 className="mb-3 text-center text-xs uppercase tracking-widest text-fg-secondary">
              AI-first, not AI generated
            </h3>
            <h3 className="mb-3 text-center text-3xl font-bold text-fg">
              Tools and workflows
            </h3>
            <p className="mx-auto mb-10 max-w-sm text-center text-base leading-relaxed text-fg-secondary">
              The right mix of strategy, design, AI, and engineering, based on
              what needs to ship.
            </p>

            <div className="relative mt-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="flex w-max gap-4 animate-tools-marquee">
                {[...Array(2)].map((_, duplicateIndex) => (
                  <div key={duplicateIndex} className="flex shrink-0 gap-4">
                    {tools.map((tool) => (
                      <div
                        key={tool.slug}
                        className="tool-logo-lockup group/tool flex h-16 shrink-0 items-center gap-3 px-2"
                      >
                        <img
                          src={tool.image ?? `/logos/tools/${tool.slug}.svg`}
                          alt={tool.label}
                          className={`tool-logo-mark h-7 transition-all duration-300 ${tool.slug === "uxpilot" ? "w-[30px] object-cover object-left" : "w-7 object-contain"} ${tool.slug === "chatgpt" ? "tool-logo-mark-monochrome" : ""}`}
                          onError={(event) => {
                            event.currentTarget.style.opacity = "0.2";
                          }}
                        />
                        <span className="whitespace-nowrap text-sm font-normal text-[var(--text-secondary)] transition-colors duration-300 group-hover/tool:text-[var(--text-primary)] font-[family-name:var(--font-sans)]">
                          {tool.label}
                        </span>
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
