import ScrollReveal from "./ScrollReveal";
import FlipAction from "./ui/FlipAction.jsx";

export default function About() {
  return (
    <section
      id="about"
      className="about-section relative bg-[var(--bg-about-test)] py-12 md:py-32"
      style={{
        "--text-primary": "var(--about-test-text-primary)",
        "--text-secondary": "var(--about-test-text-secondary)",
        "--border-default": "var(--about-test-border)",
        "--eyebrow-dot": "var(--about-test-text-primary)",
      }}
    >
      <div className="site-container about-inner relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full bg-[var(--eyebrow-dot)]"
            aria-hidden="true"
          />
          <h3 className="text-sm uppercase tracking-widest text-[var(--text-primary)] md:text-base">
            About me
          </h3>
        </div>

        <div className="about-layout grid grid-cols-1 items-start gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-16 xl:gap-x-24">
          <div className="about-heading-wrap max-w-[46rem]">
            <ScrollReveal
              baseOpacity={0.15}
              enableBlur={true}
              baseRotation={0}
              blurStrength={4}
              wordAnimationEnd="bottom 70%"
              rotationEnd="bottom 70%"
              containerClassName="text-[var(--text-primary)]"
              textClassName="font-[family-name:var(--font-display)] text-[clamp(2rem,calc(1rem+1.7vw),3rem)] font-semibold leading-[1.1] tracking-[0.01em] normal-case"
              as="h4"
            >
              I&apos;m a product designer who helps founders make the hard
              decisions before development starts, so what gets built is
              something people can actually use.
            </ScrollReveal>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <FlipAction
                as="a"
                href="#contact"
                backLabel="Let’s talk →"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-blue-500)] px-6 text-base font-bold tracking-wide text-white transition-colors duration-300 sm:bg-[var(--hero-cta-bg)] sm:text-sm sm:text-[var(--hero-cta-text)] sm:hover:bg-[var(--color-blue-500)] sm:hover:text-white lg:text-[length:var(--text-body-md)] lg:leading-[var(--text-body-md--line-height)] font-[family-name:var(--font-display)]"
              >
                Book a call <span aria-hidden="true">&rarr;</span>
              </FlipAction>
              <a
                href="/youssef-osama-product-designer-resume.pdf"
                download
                className="secondary-action inline-flex h-12 items-center justify-center rounded-full border px-6 text-base font-bold tracking-wide transition-all duration-300 sm:text-sm lg:text-base font-[family-name:var(--font-display)]"
              >
                Download Resume <span className="ml-2" aria-hidden="true">&darr;</span>
              </a>
            </div>
          </div>

          <div className="about-supporting flex flex-col gap-12 lg:gap-14">
            <div className="about-copy">
              <p className="max-w-[44rem] text-base leading-[1.75] text-[var(--text-secondary)] lg:text-lg">
                Before I open Figma, I want to understand the business, the
                people using it, and what actually needs to be built. Most of
                the expensive mistakes live in that gap, a feature everyone
                agreed on that nobody opens, a layout that looks right in the
                list view and falls apart on mobile.
              </p>
              <p className="mt-6 max-w-[44rem] text-base leading-[1.75] text-[var(--text-secondary)] lg:text-lg">
                The part I like most is taking an idea that still feels messy
                and giving it an order. And I&apos;d rather watch your numbers move
                than just hand over a file, your results reflect on me too.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
