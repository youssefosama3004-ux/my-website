import { useEffect, useRef, useState } from "react";
import { StaggeredMenu } from "./StaggeredMenu/StaggeredMenu";
import ThemeTogglerButton from "./ui/ThemeTogglerButton";
import logo from "../assets/youssef-logo.svg";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [forceExpanded, setForceExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);
  const sequenceTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const about = document.getElementById("about");
      if (!about) return;
      const bounds = about.getBoundingClientRect();
      const navFocusLine = Math.min(104, window.innerHeight * 0.16);
      setAboutActive(bounds.top <= navFocusLine && bounds.bottom > navFocusLine);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sequenceTimerRef.current) {
        window.clearTimeout(sequenceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const scrollPosition = window.scrollY;
    const body = document.body;
    const root = document.documentElement;
    const previousBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    const previousRootOverflow = root.style.overflow;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.width = "100%";

    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyStyles.overflow;
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      window.scrollTo(0, scrollPosition);
    };
  }, [menuOpen]);

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
    setMenuOpen(true);
  };

  const closeMenu = () => {
    clearSequenceTimer();
    setMenuOpen(false);
    sequenceTimerRef.current = window.setTimeout(() => {
      setForceExpanded(false);
      sequenceTimerRef.current = null;
    }, 320);
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
    { label: "About", link: "/#about" },
    { label: "Services", link: "/#services" },
    { label: "Contact", link: "/#contact" },
  ];

  const socialItems = [
    { label: "LinkedIn", link: "#", iconUrl: "/icons/social-linkedin.svg" },
    { label: "Instagram", link: "#", iconUrl: "/icons/social-instagram.svg" },
    { label: "WhatsApp", link: "#", iconUrl: "/icons/social-whatsapp.svg" },
    { label: "Email", link: "#", iconUrl: "/icons/social-mail.svg" },
  ];

  return (
    <>
      {/* Fixed header bar */}
      <header
        className={`site-nav-header pointer-events-none fixed left-1/2 top-0 z-[1300] flex w-full max-w-none -translate-x-1/2 items-center justify-between rounded-none border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          collapsed
            ? "mt-0 border-x-0 border-t-0 border-[color-mix(in_srgb,var(--text-primary)_12%,transparent)] bg-[color-mix(in_srgb,var(--text-primary)_6%,transparent)] px-5 py-3 backdrop-blur-xl sm:px-6 md:px-12 lg:py-4"
            : "mt-0 border-transparent bg-transparent px-5 py-3 backdrop-blur-0 sm:px-6 sm:py-6 md:px-12"
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
            className={`w-auto transition-all duration-500 ${collapsed ? "h-7 sm:h-8 lg:h-12" : "h-8 sm:h-9 lg:h-12"} ${aboutActive ? "nav-logo-about" : ""}`}
          />
        </a>

        <div
          className={`pointer-events-auto flex items-center gap-1 ${
            collapsed ? "text-[var(--text-primary)]" : "text-[var(--hero-text-primary)]"
          }`}
        >
          <ThemeTogglerButton className="site-nav-control" />

          {/* Hamburger */}
          <button
            type="button"
            onClick={handleToggle}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="staggered-menu-panel"
            className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center gap-1.5"
          >
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* StaggeredMenu — header hidden, controlled externally */}
      <StaggeredMenu
        items={menuItems}
        socialItems={socialItems}
        isFixed={true}
        position="right"
        colors={["var(--bg-surface)", "var(--bg-elevated)"]}
        accentColor="var(--accent)"
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        displaySocials={true}
        displayItemNumbering={true}
        closeOnClickAway={false}
        hideHeader={true}
        externalOpen={menuOpen}
        onItemClick={closeMenu}
      />
    </>
  );
}
