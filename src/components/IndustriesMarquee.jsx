import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
} from "framer-motion";

const industries = [
  "Government",
  "Fintech",
  "Ecommerce",
  "Trade & Logistics",
  "Associations",
  "Startups",
  "Agency",
];

function IndustryLine({ segmentRef }) {
  return (
    <div
      ref={segmentRef}
      className="flex shrink-0 items-baseline gap-5 pr-5 md:gap-9 md:pr-9"
    >
      {industries.map((industry) => (
        <span key={industry} className="flex shrink-0 items-baseline gap-5 md:gap-9">
          <span>{industry}</span>
          <span
            className="text-[2rem] font-bold leading-none text-[var(--accent)]"
            aria-hidden="true"
          >
            .
          </span>
        </span>
      ))}
    </div>
  );
}

export default function IndustriesMarquee() {
  const segmentRef = useRef(null);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  useEffect(() => {
    if (!segmentRef.current) return undefined;

    const measure = () => {
      setSegmentWidth(segmentRef.current?.getBoundingClientRect().width ?? 0);
      x.set(0);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(segmentRef.current);
    return () => observer.disconnect();
  }, [x]);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || paused || segmentWidth === 0) return;

    const velocity = smoothVelocity.get();
    const speedBoost = Math.min(Math.abs(velocity) / 700, 2.5);
    let next = x.get() - 38 * (delta / 1000) * (1 + speedBoost);

    while (next <= -segmentWidth) next += segmentWidth;
    while (next > 0) next -= segmentWidth;
    x.set(next);
  });

  return (
    <section
      className="industries-marquee relative overflow-hidden bg-[var(--bg-elevated)] py-8 md:py-10"
      aria-labelledby="industries-heading"
    >
      <div className="site-container flex items-center gap-6 md:gap-10">
        <h2
          id="industries-heading"
          className="shrink-0 whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-[var(--text-primary)] md:text-base"
        >
          Industries I work in
        </h2>
        <p className="sr-only">{industries.join(", ")}</p>

        <div
          className="min-w-0 flex-1 cursor-default overflow-hidden"
          aria-hidden="true"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex w-max whitespace-nowrap text-[length:var(--text-body-lg)] font-semibold uppercase leading-[var(--text-body-lg--line-height)] tracking-[-0.01em] text-[var(--text-primary)] will-change-transform font-[family-name:var(--font-sans)]"
            style={{ x }}
          >
            <IndustryLine segmentRef={segmentRef} />
            <IndustryLine />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
