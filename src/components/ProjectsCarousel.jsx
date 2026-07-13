import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsCarousel({ projects = [] }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(false);

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
  }, [projects]);

  const handleMouseMove = (event) => {
    if (!cursorRef.current) return;
    cursorRef.current.style.left = `${event.clientX}px`;
    cursorRef.current.style.top = `${event.clientY}px`;
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute left-6 top-24 z-20 flex items-center gap-3 md:left-12 md:top-32">
        <span
          className="h-2.5 w-2.5 rounded-full bg-[var(--color-blue-500)]"
          aria-hidden="true"
        />
        <h3 className="text-sm uppercase tracking-widest text-[var(--text-primary)] md:text-base">
          My Work
        </h3>
      </div>

      <div className="relative z-10 flex h-screen items-center max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory">
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-6 will-change-transform md:px-12"
        >
          {projects.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group relative h-[62vh] w-[80vw] shrink-0 overflow-hidden rounded-2xl max-md:snap-center md:w-[60vw] lg:w-[42vw]"
              onMouseEnter={() => setCursorVisible(true)}
              onMouseLeave={() => setCursorVisible(false)}
            >
              <img
                src={project.cover}
                alt={`${project.title} project cover`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                draggable={false}
              />

              <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-2">
                {project.services.slice(0, 2).map((service) => (
                  <h4
                    key={service}
                    className="rounded-md bg-black/40 px-3 py-1.5 text-xs uppercase tracking-wide text-white backdrop-blur-sm"
                  >
                    {service}
                  </h4>
                ))}
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white md:text-3xl">
                  {project.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 max-md:hidden"
        style={{ opacity: cursorVisible ? 1 : 0 }}
        aria-hidden="true"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white">
          <span className="text-center text-xs font-bold uppercase tracking-wide text-black font-[family-name:var(--font-display)]">
            View
            <br />
            Project
          </span>
        </div>
      </div>
    </section>
  );
}
