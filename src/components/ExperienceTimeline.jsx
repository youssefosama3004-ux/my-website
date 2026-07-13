import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "../data/experience.js";

gsap.registerPlugin(ScrollTrigger);

function ExperienceCard({ job }) {
  return (
    <article className="w-[85vw] rounded-2xl border border-[var(--border-default,rgba(255,255,255,0.1))] bg-[var(--bg-surface)] p-6 md:w-[440px]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--border-default,rgba(255,255,255,0.1))] bg-[color-mix(in_srgb,var(--text-primary)_10%,var(--bg-surface))]">
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="h-full w-full object-contain p-1.5"
            />
          </div>
          <div>
            <h3 className="text-base font-bold leading-tight text-[var(--text-primary)] md:text-lg">
              {job.role}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {job.company}
            </p>
          </div>
        </div>

        <span className="shrink-0 whitespace-nowrap rounded-full bg-[color-mix(in_srgb,var(--text-primary)_6%,transparent)] px-2.5 py-1 text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">
          {job.location}
        </span>
      </div>

      <div className="mb-4 border-t border-[var(--border-default,rgba(255,255,255,0.1))]" />

      <ul className="space-y-2.5">
        {job.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-secondary)]"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-blue-500)]"
              aria-hidden="true"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ExperienceTimeline() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const useNativeScroll = window.matchMedia(
      "(pointer: coarse), (max-width: 767px)",
    ).matches;
    if (useNativeScroll) return undefined;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const triggers = [];
    const context = gsap.context(() => {
      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - section.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }, section);

    const refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      cancelAnimationFrame(refreshFrame);
      triggers.forEach((trigger) => trigger.kill());
      context.revert();
    };
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden border-t border-[color-mix(in_srgb,var(--color-accent-2)_12%,transparent)] bg-[var(--bg-elevated)]"
    >
      {/* Atmospheric background glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 50% 50%, color-mix(in srgb, var(--color-blue-500) 8%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in srgb, var(--text-primary) 4%, transparent) 0%, transparent 75%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden">
        <span className="select-none whitespace-nowrap text-[18vw] font-bold uppercase leading-none tracking-wide text-[var(--text-primary)] opacity-[0.05] font-[family-name:var(--font-display)]">
          My Journey
        </span>
      </div>

      <div className="absolute left-6 top-12 z-20 flex items-center gap-3 md:left-12">
        <span
          className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-2)]"
          aria-hidden="true"
        />
        <h3 className="text-sm uppercase tracking-widest text-[var(--text-primary)] md:text-base">
          My Journey
        </h3>
      </div>

      <div className="relative z-10 flex h-screen items-center max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory">
        <div
          ref={trackRef}
          className="relative flex w-max items-center px-6 will-change-transform md:px-12"
        >
          <div
            className="absolute inset-x-0 top-1/2 z-0 h-px -translate-y-1/2 bg-[var(--border-default,rgba(255,255,255,0.15))]"
            aria-hidden="true"
          />

          {experience.map((job, index) => {
            const cardOnTop = index % 2 === 0;
            const isCurrent = job.date.includes("Present");
            const datePillClass = isCurrent
              ? "bg-teal-500 text-white"
              : "bg-[color-mix(in_srgb,var(--color-blue-500)_15%,transparent)] text-[var(--color-blue-500)]";

            return (
              <div
                key={`${job.company}-${job.date}`}
                className="relative flex h-[88vh] w-[85vw] shrink-0 snap-center flex-col items-center px-4 md:w-[480px]"
              >
                <div
                  className="absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-blue-500)] ring-4 ring-[var(--bg-primary)]"
                  aria-hidden="true"
                />

                <div
                  className={`absolute left-1/2 w-px -translate-x-1/2 bg-[var(--border-default,rgba(255,255,255,0.15))] ${
                    cardOnTop ? "bottom-1/2 h-[8%]" : "top-1/2 h-[8%]"
                  }`}
                  aria-hidden="true"
                />

                {cardOnTop ? (
                  <div className="absolute bottom-1/2 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 pb-[8%]">
                    <span
                      className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs uppercase tracking-wide ${datePillClass}`}
                    >
                      {job.date}
                    </span>
                    <ExperienceCard job={job} />
                  </div>
                ) : (
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 flex-col items-center gap-4 pt-[8%]">
                    <ExperienceCard job={job} />
                    <span
                      className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs uppercase tracking-wide ${datePillClass}`}
                    >
                      {job.date}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
