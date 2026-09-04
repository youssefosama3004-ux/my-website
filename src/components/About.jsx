import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import FlipAction from "./ui/FlipAction.jsx";

const aboutStats = [
  { value: 98, suffix: "%", label: "Clients satisfied and repeating" },
  { value: 25, suffix: "+", label: "Projects completed across industries" },
  { value: 12, prefix: "+", label: "Countries around the world" },
];

function CounterStat({ value, prefix = "", suffix = "", label }) {
  const valueRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = valueRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <div className="flex min-w-0 flex-col items-center px-2 py-5 text-center sm:px-3">
      <p
        ref={valueRef}
        className="text-3xl font-semibold leading-none tabular-nums text-[var(--text-primary)] sm:text-4xl"
        aria-label={`${prefix}${value}${suffix}`}
      >
        {prefix}
        {displayValue}
        {suffix}
      </p>
      <p className="mt-3 text-[10px] leading-snug text-[var(--text-secondary)] sm:text-xs">
        {label}
      </p>
    </div>
  );
}

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
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-base font-bold tracking-wide text-[var(--accent-fg)] transition-colors duration-300 hover:bg-[var(--color-blue-600)] hover:text-white sm:text-sm lg:text-[length:var(--text-body-md)] lg:leading-[var(--text-body-md--line-height)] font-[family-name:var(--font-display)]"
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

            <div className="mt-10 grid grid-cols-3 divide-x divide-[var(--border-default)] border-y border-[var(--border-default)]">
              {aboutStats.map((stat) => (
                <CounterStat key={stat.label} {...stat} />
              ))}
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
              <div className="mt-8 aspect-[16/9] w-full overflow-hidden border border-[var(--border-default)]">
                <img
                  src="/images/youssef-about-portrait.png"
                  alt="Portrait of Youssef Osama"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
