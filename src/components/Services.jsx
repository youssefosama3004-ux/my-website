import { useState } from "react";

const services = [
  {
    title: "Product Design",
    desc: "End-to-end product design — research, journeys, IA, wireframes, and high-fidelity UI for web and mobile products that convert.",
    points: ["Web & mobile app design", "Design systems", "Prototyping & testing"],
    image: "/images/services/product-design.jpg",
  },
  {
    title: "Web Development",
    desc: "I build what I design. Same person, same week — no handoff, no waiting on dev. The site goes live looking exactly like the comp.",
    points: ["Marketing & company websites", "Landing pages", "Front-end development"],
    image: "/images/services/web-development.jpg",
  },
  {
    title: "Ecommerce",
    desc: "Conversion-focused online stores — storefront UX, product pages, and checkout flows designed and built to turn visitors into customers.",
    points: ["Storefront design", "Product & checkout UX", "Conversion optimization"],
    image: "/images/services/ecommerce.jpg",
  },
  {
    title: "UX Consulting",
    desc: "Expert UX strategy, audits, and design-thinking workshops — tailored guidance to sharpen journeys and align design with business goals.",
    points: ["UX audits", "Strategy & workshops", "Usability testing"],
    image: "/images/services/ux-consulting.jpg",
  },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="services"
      className="relative border-t border-[color-mix(in_srgb,var(--color-accent-2)_12%,transparent)] bg-[var(--bg-elevated)] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-2,var(--color-blue-500))]"
            aria-hidden="true"
          />
          <h3 className="text-sm uppercase tracking-widest text-[var(--text-primary)] md:text-base">
            What I do
          </h3>
        </div>

        <div className="border-t border-[var(--border-default,rgba(255,255,255,0.12))]">
          {services.map((service, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={service.title}
                className="border-b border-[var(--border-default,rgba(255,255,255,0.12))]"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="group flex w-full items-center gap-6 py-6 text-left md:gap-10"
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${index}`}
                >
                  <h3 className="shrink-0 tabular-nums text-3xl font-bold tracking-wide text-[var(--text-primary)] md:text-5xl">
                    0{index + 1}
                  </h3>

                  <h3 className="flex-1 text-3xl font-bold tracking-wide text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--color-blue-500)] md:text-5xl">
                    {service.title}
                  </h3>

                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center md:h-9 md:w-9"
                    aria-hidden="true"
                  >
                    <span
                      className="h-6 w-6 bg-[var(--color-blue-500)] md:h-7 md:w-7"
                      style={{
                        WebkitMaskImage: `url(${
                          isOpen
                            ? "/icons/accordion-minus.svg"
                            : "/icons/accordion-plus.svg"
                        })`,
                        maskImage: `url(${
                          isOpen
                            ? "/icons/accordion-minus.svg"
                            : "/icons/accordion-plus.svg"
                        })`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                      }}
                    />
                  </span>
                </button>

                <div
                  id={`service-panel-${index}`}
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 gap-8 pb-10 pt-1 md:grid-cols-2 md:gap-12">
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border-default,rgba(255,255,255,0.1))] bg-[color-mix(in_srgb,var(--text-primary)_6%,transparent)]">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <p className="max-w-md text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                          {service.desc}
                        </p>
                        <ul className="mt-6 space-y-2.5">
                          {service.points.map((point) => (
                            <li
                              key={point}
                              className="flex gap-3 text-sm text-[var(--text-secondary)] md:text-base"
                            >
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-blue-500)]"
                                aria-hidden="true"
                              />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 text-fg md:p-10">
            <div className="mb-8 flex flex-wrap items-center gap-5 md:gap-6">
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

            <h3 className="mb-3 text-2xl font-bold text-fg md:text-3xl">
              Built on the right platform
            </h3>
            <p className="max-w-md text-base leading-relaxed text-fg-secondary">
              WordPress, Shopify, Salla, Webflow, or custom React — I pick the
              platform that fits your goals, budget, and how you'll run it
              after launch. No forcing every project into one stack.
            </p>
          </div>

          <div className="relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 text-fg md:p-10">
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
                    {[
                      "figma",
                      "framer",
                      "webflow",
                      "react",
                      "nextjs",
                      "tailwind",
                      "blender",
                      "gsap",
                      "astro",
                      "wordpress",
                    ].map((tool) => (
                      <div
                        key={tool}
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-grey-100)] bg-[var(--color-grey-50)]"
                      >
                        <img
                          src={`/logos/tools/${tool}.svg`}
                          alt={tool}
                          className="h-7 w-7 object-contain"
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
