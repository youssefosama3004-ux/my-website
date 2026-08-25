import { motion, useReducedMotion } from "motion/react";

const springTransition = {
  type: "spring",
  stiffness: 280,
  damping: 20,
};

const frontVariants = {
  idle: { opacity: 1, rotateX: 0, y: "0%" },
  flipped: { opacity: 0, rotateX: 90, y: "-50%" },
};

const backVariants = {
  idle: { opacity: 0, rotateX: -90, y: "50%" },
  flipped: { opacity: 1, rotateX: 0, y: "0%" },
};

export default function FlipAction({
  as = "button",
  backLabel = "Let’s talk →",
  children,
  className = "",
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const MotionElement = as === "a" ? motion.a : motion.button;
  const interactiveState = reduceMotion ? undefined : "flipped";

  return (
    <MotionElement
      initial="idle"
      whileHover={interactiveState}
      whileFocus={interactiveState}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      className={`flip-action ${className}`}
      {...props}
    >
      <span className="flip-action-stack">
        <motion.span
          variants={frontVariants}
          transition={springTransition}
          className="flip-action-face"
        >
          {children}
        </motion.span>
        <motion.span
          aria-hidden="true"
          variants={backVariants}
          transition={springTransition}
          className="flip-action-face"
        >
          {backLabel}
        </motion.span>
      </span>
    </MotionElement>
  );
}
