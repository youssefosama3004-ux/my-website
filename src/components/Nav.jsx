import { useEffect, useRef, useState } from "react";
import { StaggeredMenu } from "./StaggeredMenu/StaggeredMenu";
import logo from "../assets/youssef-logo.svg";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [forceExpanded, setForceExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sequenceTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sequenceTimerRef.current) {
        window.clearTimeout(sequenceTimerRef.current);
      }
    };
  }, []);

  const collapsed = scrolled && !forceExpanded && !menuOpen;

  const clearSequenceTimer = () => {
    if (sequenceTimerRef.current) {
      window.clearTimeout(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearSequenceTimer();
    setForceExpanded(true);
    sequenceTimerRef.current = window.setTimeout(() => {
      setMenuOpen(true);
      sequenceTimerRef.current = null;
    }, 500);
  };

  const closeMenu = () => {
    clearSequenceTimer();
    setMenuOpen(false);
    sequenceTimerRef.current = window.setTimeout(() => {
      setForceExpanded(false);
      sequenceTimerRef.current = null;
    }, 500);
  };

  const handleToggle = () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const menuItems = [
    { label: "Work", link: "/work" },
    { label: "About", link: "/about" },
    { label: "Blog", link: "/blog" },
    { label: "Contact", link: "#contact" },
  ];

  return (
    <>
      {/* Fixed header bar */}
      <header
        className={`pointer-events-none fixed left-1/2 top-0 z-[1300] flex -translate-x-1/2 items-center justify-between border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          collapsed
            ? "mt-4 w-[90%] max-w-md rounded-full border-[color-mix(in_srgb,var(--text-primary)_12%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_6%,transparent)] px-5 py-3 backdrop-blur-xl"
            : "mt-0 w-full max-w-none rounded-none border-transparent bg-transparent px-6 py-6 backdrop-blur-0 md:px-12"
        }`}
      >
        {/* Logo */}
        <a
          href="/"
          aria-label="Home"
          className="block transition-opacity duration-300 hover:opacity-70 pointer-events-auto"
        >
          <img
            src={logo.src}
            alt="Youssef logo"
            className={`w-auto transition-all duration-500 ${collapsed ? "h-7" : "h-8"}`}
          />
        </a>

        {/* Hamburger */}
        <button
          onClick={handleToggle}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className={`w-12 h-12 flex flex-col items-center justify-center gap-1.5 cursor-pointer pointer-events-auto ${
            collapsed ? "text-[var(--text-primary)]" : "text-white"
          }`}
        >
          <span className={`block w-6 h-px bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block w-6 h-px bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </header>

      {/* StaggeredMenu — header hidden, controlled externally */}
      <StaggeredMenu
        items={menuItems}
        isFixed={true}
        position="right"
        colors={["#1a1a2e", "#16213e"]}
        accentColor="var(--accent)"
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        displaySocials={false}
        displayItemNumbering={true}
        closeOnClickAway={false}
        hideHeader={true}
        externalOpen={menuOpen}
      />
    </>
  );
}
