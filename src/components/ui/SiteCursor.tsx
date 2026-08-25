import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CURSOR_SIZE = 32;
const SPRING = {
  mass: 0.1,
  damping: 10,
  stiffness: 131,
};

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']";

export default function SiteCursor() {
  const x = useMotionValue(-CURSOR_SIZE);
  const y = useMotionValue(-CURSOR_SIZE);
  const opacity = useMotionValue(0);
  const scale = useMotionValue(0.7);
  const xSpring = useSpring(x, SPRING);
  const ySpring = useSpring(y, SPRING);
  const opacitySpring = useSpring(opacity, SPRING);
  const scaleSpring = useSpring(scale, SPRING);
  const [isInteractive, setIsInteractive] = React.useState(false);
  const interactiveRef = React.useRef(false);

  React.useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateAvailability = () => {
      document.documentElement.classList.toggle(
        "custom-cursor-active",
        finePointer.matches,
      );
      if (!finePointer.matches) opacity.set(0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) return;

      x.set(event.clientX - CURSOR_SIZE / 2);
      y.set(event.clientY - CURSOR_SIZE / 2);
      opacity.set(1);

      const target = event.target;
      const nextInteractive =
        target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR));

      if (nextInteractive !== interactiveRef.current) {
        interactiveRef.current = nextInteractive;
        setIsInteractive(nextInteractive);
      }
      scale.set(nextInteractive ? 1.55 : 1);
    };

    const handlePointerLeave = () => opacity.set(0);
    const handlePointerDown = () =>
      scale.set(interactiveRef.current ? 1.3 : 0.82);
    const handlePointerUp = () =>
      scale.set(interactiveRef.current ? 1.55 : 1);

    updateAvailability();
    finePointer.addEventListener("change", updateAvailability);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      finePointer.removeEventListener("change", updateAvailability);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, [opacity, scale, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className={`site-cursor ${isInteractive ? "site-cursor--interactive" : ""}`}
      style={{
        x: xSpring,
        y: ySpring,
        opacity: opacitySpring,
        scale: scaleSpring,
      }}
    >
      <span className="site-cursor__dot" />
    </motion.div>
  );
}
