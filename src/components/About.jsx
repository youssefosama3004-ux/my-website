import ScrollReveal from "./ScrollReveal";
import FlipAction from "./ui/FlipAction.jsx";

export default function About() {
  return (
    <>
    <section
      id="about"
      className="about-section relative bg-[var(--bg-about)] py-12 md:py-32"
      style={{
        "--text-primary": "var(--about-text-primary)",
        "--text-secondary": "var(--about-text-secondary)",
        "--border-default": "var(--about-border)",
        "--eyebrow-dot": "var(--color-grey-0)",
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
              containerClassName="text-[clamp(2rem,calc(1rem+1.7vw),3rem)] font-bold leading-[1.1] tracking-wide text-[var(--text-primary)] font-[family-name:var(--font-display)]"
              as="h2"
            >
              I&apos;M A PRODUCT DESIGNER WHO HELPS FOUNDERS MAKE THE HARD
              DECISIONS BEFORE DEVELOPMENT STARTS, SO WHAT GETS BUILT IS
              SOMETHING PEOPLE CAN ACTUALLY USE.
            </ScrollReveal>
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

      <section
        className="about-section relative border-t border-[var(--about-test-border)] bg-[var(--bg-about-test)] py-12 md:py-32"
        style={{
          "--text-primary": "var(--about-test-text-primary)",
          "--text-secondary": "var(--about-test-text-secondary)",
          "--border-default": "var(--about-test-border)",
          "--eyebrow-dot": "var(--color-grey-0)",
        }}
        aria-label="About me alternate layout"
      >
        <div className="site-container relative z-10">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full bg-[var(--eyebrow-dot)]"
              aria-hidden="true"
            />
            <h3 className="text-sm uppercase tracking-widest text-[var(--text-primary)] md:text-base">
              About me
            </h3>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:gap-16 xl:gap-24">
            <div className="max-w-[50rem]">
              <ScrollReveal
                baseOpacity={0.15}
                enableBlur={true}
                baseRotation={0}
                blurStrength={4}
                wordAnimationEnd="bottom 70%"
                rotationEnd="bottom 70%"
                containerClassName="text-[clamp(2rem,calc(1rem+1.7vw),3rem)] font-bold leading-[1.1] tracking-wide text-[var(--text-primary)] font-[family-name:var(--font-display)]"
                as="h2"
              >
                I&apos;M A PRODUCT DESIGNER WHO HELPS FOUNDERS MAKE THE HARD
                DECISIONS BEFORE DEVELOPMENT STARTS, SO WHAT GETS BUILT IS
                SOMETHING PEOPLE CAN ACTUALLY USE.
              </ScrollReveal>

              <div className="mt-10 max-w-[44rem] space-y-6">
                <p className="text-base leading-[1.75] text-[var(--text-secondary)] lg:text-lg">
                  Before I open Figma, I want to understand the business, the
                  people using it, and what actually needs to be built. Most of
                  the expensive mistakes live in that gap, a feature everyone
                  agreed on that nobody opens, a layout that looks right in the
                  list view and falls apart on mobile.
                </p>
                <p className="text-base leading-[1.75] text-[var(--text-secondary)] lg:text-lg">
                  The part I like most is taking an idea that still feels messy
                  and giving it an order. And I&apos;d rather watch your numbers move
                  than just hand over a file, your results reflect on me too.
                </p>
              </div>

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
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--text-primary)] px-6 text-base font-bold tracking-wide text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--text-primary)] hover:text-[var(--bg-about-test)] sm:text-sm lg:text-base font-[family-name:var(--font-display)]"
                >
                  Download Resume <span className="ml-2" aria-hidden="true">&darr;</span>
                </a>
              </div>
            </div>

            <div className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-3xl border border-dashed border-[var(--border-default)] bg-[color-mix(in_srgb,var(--text-primary)_4%,transparent)] text-[var(--text-secondary)]">
              <div className="flex flex-col items-center gap-4 text-center">
                <svg viewBox="0 0 48 48" className="h-10 w-10 opacity-60" aria-hidden="true">
                  <rect x="5" y="7" width="38" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="17" cy="18" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m9 36 10-10 7 7 5-5 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-medium">Image placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
