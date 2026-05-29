import { useState } from "react";
import { StaggeredMenu } from "./StaggeredMenu/StaggeredMenu";
import logo from "../assets/youssef-logo.svg";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Work", link: "/work" },
    { label: "About", link: "/about" },
    { label: "Blog", link: "/blog" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <>
      {/* Fixed header bar */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-6 pointer-events-none">
        {/* Logo */}
        <a
          href="/"
          aria-label="Home"
          className="block transition-opacity duration-300 hover:opacity-70 pointer-events-auto"
        >
          <img src={logo.src} alt="Youssef logo" className="h-8 w-auto" />
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-[var(--text-primary)] pointer-events-auto"
        >
          <span className={`block w-6 h-px bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block w-6 h-px bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
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
        externalOpen={open}
        onMenuOpen={() => setOpen(true)}
        onMenuClose={() => setOpen(false)}
      />
    </>
  );
}
