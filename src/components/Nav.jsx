import { useEffect, useRef, useState } from "react";
import { Blocks, BriefcaseBusiness, Send, UserRound } from "lucide-react";
import { StaggeredMenu } from "./StaggeredMenu/StaggeredMenu";
import ThemeTogglerButton from "./ui/ThemeTogglerButton";
import logo from "../assets/youssef-logo.svg";

const SHOW_THEME_TOGGLER = false;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [forceExpanded, setForceExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const sequenceTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const navFocusLine = Math.min(104, window.innerHeight * 0.16);
      const about = document.getElementById("about");
      const aboutBounds = about?.getBoundingClientRect();
      setAboutActive(
        Boolean(aboutBounds && aboutBounds.top <= navFocusLine && aboutBounds.bottom > navFocusLine),
      );

      const railFocusLine = window.innerHeight * 0.45;
      const currentSection = ["work", "about", "services", "contact"].find((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const bounds = section.getBoundingClientRect();
        return bounds.top <= railFocusLine && bounds.bottom > railFocusLine;
      });
      setActiveSection(currentSection ?? "");
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
    { label: "About", link: "/#about", icon: UserRound },
    { label: "Services", link: "/#services", icon: Blocks },
    { label: "Work", link: "/#work", icon: BriefcaseBusiness },
    { label: "Contact", link: "/#contact", icon: Send },
  ];

  const socialItems = [
    { label: "Email", link: "mailto:youssefosama3004@gmail.com", iconUrl: "/icons/social-mail.svg" },
  ];

  return (
    <>
      {/* Fixed header bar */}
      <header
        className={`site-nav-header pointer-events-none fixed left-1/2 top-0 z-[1300] flex w-full max-w-none -translate-x-1/2 items-center justify-between rounded-none border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${
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
          } ${menuOpen ? "invisible" : ""}`}
        >
          {SHOW_THEME_TOGGLER && <ThemeTogglerButton className="site-nav-control" />}

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

      <nav className={`desktop-liquid-rail hidden lg:flex ${scrolled ? "is-connected" : ""}`} aria-label="Primary navigation">
        <div className="desktop-liquid-capsule">
          <a href="/" aria-label="Home" className="desktop-liquid-logo" title="Home">
            <img src={logo.src} alt="" />
          </a>

          {menuItems.map(({ label, link, icon: Icon }) => (
            <a
              key={label}
              href={link}
              aria-label={label}
              title={label}
              className={`desktop-liquid-link ${activeSection === label.toLowerCase() ? "is-active" : ""}`}
            >
              <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </div>

        {SHOW_THEME_TOGGLER && <ThemeTogglerButton className="desktop-liquid-theme" />}
      </nav>

      {/* StaggeredMenu — header hidden, controlled externally */}
      <StaggeredMenu
        className="lg:hidden"
        items={menuItems}
        socialItems={socialItems}
        isFixed={true}
        position="left"
        colors={["rgba(30, 99, 255, 0.16)", "rgba(12, 12, 16, 0.54)"]}
        accentColor="var(--accent)"
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        displaySocials={true}
        displayItemNumbering={false}
        closeOnClickAway={false}
        hideHeader={true}
        externalOpen={menuOpen}
        onRequestClose={closeMenu}
        onItemClick={closeMenu}
      />
    </>
  );
}
