"use client";

import { useEffect, useState } from "react";
import { sectionList, type SectionId } from "@/lib/sections";

export function IndexRail() {
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sectionList.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
    >
      {sectionList.map(({ id, label, index }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center gap-3"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`h-px transition-all duration-300 ${
                isActive ? "w-8 bg-accent" : "w-4 bg-line group-hover:w-6 group-hover:bg-accent-dim"
              }`}
            />
            <span
              className={`font-mono text-2xs tracking-wider transition-colors duration-300 ${
                isActive ? "text-accent" : "text-muted group-hover:text-primary"
              }`}
            >
              {index} {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
