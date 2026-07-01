import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Module-level flag: schedule one deferred refresh after all instances mount.
let refreshScheduled = false;

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    // Split into words first (preserves spaces), then split each word into letters
    return text.split(/(\s+)/).map((segment, segmentIndex) => {
      if (segment.match(/^\s+$/)) {
        // Preserve whitespace as-is (no letter wrap)
        return segment;
      }
      // Split this word into individual letters
      return (
        <span className="inline-block" key={segmentIndex} style={{ whiteSpace: 'nowrap' }}>
          {segment.split('').map((char, charIndex) => (
            <span
              className="inline-block word"
              key={`${segmentIndex}-${charIndex}`}
            >
              {char}
            </span>
          ))}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect user prefers-reduced-motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // Track tweens created by THIS instance so cleanup only kills our own.
    const tweens = [];

    tweens.push(
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: true
          }
        }
      )
    );

    const wordElements = el.querySelectorAll('.word');

    tweens.push(
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.015,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true
          }
        }
      )
    );

    if (enableBlur) {
      tweens.push(
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.015,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom-=20%',
              end: wordAnimationEnd,
              scrub: true
            }
          }
        )
      );
    }

    // Force recalculation after mount — handles any initial layout shifts
    // so GSAP trigger positions are accurate.
    if (!refreshScheduled) {
      refreshScheduled = true;
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        refreshScheduled = false;
      });
    }

    return () => {
      // Kill only this instance's tweens and their associated ScrollTriggers.
      tweens.forEach(tween => {
        if (tween.scrollTrigger) {
          tween.scrollTrigger.kill();
        }
        tween.kill();
      });
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={containerClassName}>
      <p className={textClassName}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal;
