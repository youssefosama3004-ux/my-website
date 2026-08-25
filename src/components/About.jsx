import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

function CounterStat({ value, prefix = "", suffix = "", label }) {
  const valueRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = valueRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    let animationFrame = null;
    let hasStarted = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted) return;

        hasStarted = true;
        observer.disconnect();

        const startedAt = performance.now();
        const duration = 1200;

        const update = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * easedProgress));

          if (progress < 1) {
            animationFrame = requestAnimationFrame(update);
          } else {
            setDisplayValue(value);
          }
        };

        animationFrame = requestAnimationFrame(update);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value]);

  return (
    <div className="about-stat flex flex-col items-start gap-3 border-t border-[var(--color-grey-100)] pt-6">
      <h3
        ref={valueRef}
        className="about-stat-value shrink-0 text-4xl font-semibold tabular-nums text-[var(--text-primary)] md:text-6xl"
        aria-label={`${prefix}${value}${suffix}`}
      >
        {prefix}
        {displayValue}
        {suffix}
      </h3>
      <p className="about-stat-label text-sm leading-snug text-[var(--text-secondary)] md:text-base">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="about-section relative bg-[var(--bg-about)] py-24 md:py-32"
      style={{
        "--text-primary": "var(--color-grey-0)",
        "--text-secondary": "var(--color-grey-100)",
        "--border-default": "color-mix(in_srgb,var(--color-grey-0)_20%,transparent)",
      }}
    >
      <div className="site-container about-inner relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full bg-[var(--color-grey-100)]"
            aria-hidden="true"
          />
          <h3 className="text-sm uppercase tracking-widest text-[var(--text-primary)] md:text-base">
            About me
          </h3>
        </div>

        <div className="about-layout grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
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

            <div className="about-stats mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:mt-16">
              <CounterStat
                value={98}
                suffix="%"
                label="Clients satisfied and repeating"
              />
              <CounterStat
                value={25}
                suffix="+"
                label="Projects completed across industries"
              />
              <CounterStat
                value={12}
                prefix="+"
                label="Countries around the world"
              />
            </div>
          </div>

          <div className="about-supporting flex flex-col gap-12 lg:gap-14">
            <div className="about-copy">
              <p className="max-w-[44rem] text-base leading-[1.75] text-[var(--text-secondary)]">
                Before I open Figma, I want to understand the business, the
                people using it, and what actually needs to be built. Most of
                the expensive mistakes live in that gap, a feature everyone
                agreed on that nobody opens, a layout that looks right in the
                list view and falls apart on mobile.
              </p>
              <p className="mt-6 max-w-[44rem] text-base leading-[1.75] text-[var(--text-secondary)]">
                The part I like most is taking an idea that still feels messy
                and giving it an order. And I&apos;d rather watch your numbers move
                than just hand over a file, your results reflect on me too.
              </p>
              <p className="mt-6 max-w-[44rem] text-base leading-[1.75] text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  On AI:
                </span>{" "}
                I use it every day, but not to generate a product end to end.
                Get one component right for your brand first, then build the big
                parts on top of it. Otherwise you get the gradient thing that
                looks like an AI made it, and it has nothing to do with the
                identity someone already paid a designer to build.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
