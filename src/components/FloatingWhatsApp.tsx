"use client";

import { useEffect, useState } from "react";
import { hero } from "@/content";

const HIDDEN_OVER = ["hero", "reel", "contact"];

export function FloatingWhatsApp() {
  const [hiddenSections, setHiddenSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const targets = HIDDEN_OVER.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setHiddenSections((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) next.add(entry.target.id);
            else next.delete(entry.target.id);
          });
          return next;
        });
      },
      { rootMargin: "-10% 0px -10% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const visible = hiddenSections.size === 0;

  return (
    <a
      href={hero.ctaPrimary.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 font-medium text-sm text-[#06120f] shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3ddcc2] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M17.6 6.32A8.86 8.86 0 0 0 12.02 3.5a8.94 8.94 0 0 0-7.76 13.4L3 21l4.24-1.24a8.92 8.92 0 0 0 4.78 1.38h.01a8.94 8.94 0 0 0 8.93-8.93 8.87 8.87 0 0 0-2.36-5.89Zm-5.58 13.7h-.01a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.82.82.75-2.75-.18-.28a7.42 7.42 0 0 1 11.6-9.15 7.36 7.36 0 0 1 2.17 5.22 7.42 7.42 0 0 1-7.46 7.34Zm4.07-5.56c-.22-.11-1.31-.65-1.52-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.17-.48.06-.22-.11-.94-.35-1.79-1.11a6.71 6.71 0 0 1-1.24-1.54c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.06-.59.28-.2.22-.77.75-.77 1.83s.79 2.12.9 2.27c.11.15 1.55 2.37 3.76 3.32.53.23.94.36 1.26.47.53.17 1 .14 1.38.09.42-.06 1.31-.53 1.49-1.05.18-.51.18-.95.13-1.04-.05-.09-.2-.15-.42-.26Z" />
      </svg>
      WhatsApp
    </a>
  );
}
