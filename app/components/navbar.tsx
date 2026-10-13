"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Keahlian", href: "#skills" },
  { label: "Proyek", href: "#projects" },
  { label: "Kontak", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = ["home", "about", "skills", "projects", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(6,9,20,0.85)] backdrop-blur-2xl border-b border-white/8 py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-8">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
          className="flex items-center gap-2 no-underline mr-auto"
        >
          <span
            className="text-transparent bg-clip-text font-bold text-base"
            style={{ backgroundImage: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
          >
            ✦
          </span>
          <span
            className="font-[family-name:var(--font-outfit)] font-bold text-xl"
            style={{ color: "var(--text-primary)" }}
          >
            Egii.dev
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex list-none gap-1">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`relative no-underline text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 block ${
                    isActive
                      ? "text-white bg-white/4"
                      : "text-white/65 hover:text-white hover:bg-white/4"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Hire Me Button */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
          className="hidden md:inline-flex items-center px-5 py-2.5 text-white text-sm font-semibold font-[family-name:var(--font-outfit)] rounded-xl no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)]"
          style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
        >
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.5 bg-transparent border-0 cursor-pointer p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 bg-white rounded transition-all duration-300"
            style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "" }}
          />
          <span
            className="block w-6 h-0.5 bg-white rounded transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-white rounded transition-all duration-300"
            style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "" }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-b border-white/8 px-6 pb-4 pt-2 flex flex-col gap-1 bg-[rgba(6,9,20,0.97)] backdrop-blur-2xl">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              className="no-underline text-white/65 hover:text-white text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-white/4 transition-all duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
