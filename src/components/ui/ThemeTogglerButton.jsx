import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

const THEME_KEY = "youssef-kader-theme";

function getCurrentTheme() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme) {
  const root = document.documentElement;
  const isDark = theme === "dark";

  root.dataset.theme = theme;
  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);
  root.style.colorScheme = theme;

  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // The theme still works when storage is unavailable.
  }

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", isDark ? "#0A0A0A" : "#F7F7F5");
}

export default function ThemeTogglerButton({ className = "" }) {
  const buttonRef = useRef(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  const toggleTheme = async () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const button = buttonRef.current;

    if (!document.startViewTransition || reduceMotion || !button) {
      applyTheme(nextTheme);
      setTheme(nextTheme);
      return;
    }

    const bounds = button.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      applyTheme(nextTheme);
      setTheme(nextTheme);
    });

    await transition.ready;
    try {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 620,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch {
      // Older browsers still receive the theme change without the reveal.
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={!isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-current/20 bg-current/5 transition-colors duration-300 hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${className}`}
    >
      <motion.span
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : 90,
          scale: isDark ? 1 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="absolute"
        aria-hidden="true"
      >
        <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </motion.span>
      <motion.span
        initial={false}
        animate={{
          opacity: isDark ? 0 : 1,
          rotate: isDark ? -90 : 0,
          scale: isDark ? 0.55 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="absolute"
        aria-hidden="true"
      >
        <Sun className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </motion.span>
    </button>
  );
}
