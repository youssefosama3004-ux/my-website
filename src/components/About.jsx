import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section
      id="about"
      className="about-section relative bg-[var(--bg-about)] py-24 md:py-32"
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
  );
}
