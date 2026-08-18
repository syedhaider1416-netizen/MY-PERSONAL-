"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { sectionList } from "@/lib/sections";
import { hero } from "@/content";

export function ConsoleNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-base/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4"
      >
        <a href="#hero" className="shrink-0" aria-label="Back to top">
          <Logo />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {sectionList
            .filter((s) => s.id !== "hero")
            .map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="font-mono text-2xs uppercase tracking-[0.18em] text-muted transition-colors duration-200 hover:text-accent"
                >
                  {label}
                </a>
              </li>
            ))}
        </ul>

        <a
          href={hero.ctaPrimary.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-sm bg-accent px-4 py-2 font-mono text-2xs uppercase tracking-[0.15em] text-[#06120f] transition-colors duration-200 hover:bg-[#3ddcc2]"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
