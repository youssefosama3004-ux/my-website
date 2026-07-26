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
      className="about-section relative bg-[var(--bg-about)] px-6 py-24 md:py-32"
      style={{
        "--text-primary": "var(--color-grey-0)",
        "--text-secondary": "var(--color-grey-100)",
        "--border-default": "color-mix(in_srgb,var(--color-grey-0)_20%,transparent)",
      }}
    >
      <div className="about-inner relative z-10 mx-auto max-w-7xl">
        <div className="mb-5 flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full bg-[var(--color-grey-100)]"
            aria-hidden="true"
          />
          <h3 className="text-sm uppercase tracking-widest text-[var(--text-primary)] md:text-base">
            About me
          </h3>
        </div>

        <div className="about-heading-wrap mb-3 max-w-5xl md:mb-16">
          <ScrollReveal
            baseOpacity={0.15}
            enableBlur={true}
            baseRotation={0}
            blurStrength={4}
            wordAnimationEnd="bottom 70%"
            rotationEnd="bottom 70%"
            containerClassName="text-3xl font-bold leading-[1.1] tracking-wide text-[var(--text-primary)] font-[family-name:var(--font-display)] md:text-5xl lg:text-6xl"
            as="h2"
          >
            I’M A PRODUCT DESIGNER WHO ENJOYS HELPING FOUNDERS TURN EARLY IDEAS
            INTO CLEAR PRODUCTS, MAKE BETTER DECISIONS BEFORE DEVELOPMENT
            STARTS, AND BUILD SOMETHING PEOPLE CAN ACTUALLY USE.
          </ScrollReveal>
        </div>

        <div className="about-supporting grid grid-cols-1 items-end gap-12 md:gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="about-copy lg:col-span-6">
            <p className="max-w-md text-base leading-relaxed text-[var(--text-secondary)] md:max-w-3xl md:text-lg lg:max-w-md">
              I work on complex digital products by understanding the business,
              the users, and what actually needs to be built before jumping into
              screens. What I enjoy most is taking ideas that still feel messy
              and shaping them into products that truly work, while exploring
              how AI is changing the way Product Designers think, create, and
              grow.
            </p>
          </div>

          <div className="about-stats grid grid-cols-1 gap-8 md:grid-cols-3 md:pl-20 lg:col-span-6 lg:col-start-7 lg:pl-0">
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
      </div>
    </section>
  );
}
