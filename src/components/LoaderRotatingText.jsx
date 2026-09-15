import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import "./LoaderRotatingText.css";

/**
 * A loader-specific adaptation of ReactBits' RotatingText pattern. Each
 * character enters and exits independently, which keeps the word change
 * expressive without making the loader feel like a slide show.
 */
export default function LoaderRotatingText({
  texts = ["Youssef Kader", "Product Designer"],
  rotationInterval = 650,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeText = texts[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % texts.length);
    }, rotationInterval);

    return () => window.clearInterval(interval);
  }, [rotationInterval, texts.length]);

  return (
    <span
      className="loader-rotating-text"
      aria-label="Youssef Kader, Product Designer"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeText}
          className="loader-rotating-text__word"
          initial={{ opacity: 0, y: "38%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-34%" }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {activeText}
        </motion.div>
      </AnimatePresence>
    </span>
  );
}
