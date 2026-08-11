"use client";

import { motion, useReducedMotion } from "framer-motion";
import { NodeGraph } from "@/components/NodeGraph";
import { hero, site } from "@/content";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const item = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-line"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-70 md:w-3/5">
        <NodeGraph />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base via-base/85 to-transparent md:via-base/60" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32 lg:pl-28 lg:pr-12"
      >
        <motion.p
          variants={item}
          className="mb-6 font-mono text-xs tracking-wider text-accent"
        >
          {hero.eyebrow} — {site.location}
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-primary md:text-5xl lg:text-6xl"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          {hero.sub}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={hero.ctaPrimary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 font-medium text-base text-[#06120f] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#3ddcc2] focus-visible:-translate-y-0.5"
          >
            {hero.ctaPrimary.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="inline-flex items-center gap-2 rounded-sm border border-line px-6 py-3.5 font-medium text-base text-primary transition-colors duration-200 hover:border-accent-dim hover:text-accent"
          >
            {hero.ctaSecondary.label}
          </a>
        </motion.div>

        <motion.p variants={item} className="mt-16 font-mono text-2xs text-muted">
          {site.locationNote}
        </motion.p>
      </motion.div>
    </section>
  );
}
