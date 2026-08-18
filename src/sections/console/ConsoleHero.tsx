"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/explore/Counter";
import { trackSpotlight } from "@/components/explore/spotlight";
import { hero, site, stats } from "@/content";

export function ConsoleHero() {
  const shouldReduceMotion = useReducedMotion();

  const item = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="hero" className="relative overflow-hidden border-b border-line pt-28">
      {/* No node graph here: the live aurora is the hero's background, and a
          second WebGL context just to overlay it costs more than it adds.
          Only a left-side scrim, to hold text contrast over the brightest
          part of the field. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base/88 via-base/45 to-transparent" />

      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-16"
      >
        <motion.p
          variants={item}
          className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-2xs uppercase tracking-[0.2em] text-accent"
        >
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Available for work
          </span>
          <span className="text-line">/</span>
          <span className="text-muted">{site.location}</span>
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-3xl font-display text-3xl font-semibold leading-[1.06] tracking-tight text-primary md:text-5xl"
        >
          I build the system.{" "}
          <span className="shimmer">I build what fills it.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-2xl text-sm leading-relaxed text-primary md:text-[1rem]"
        >
          {hero.sub}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={hero.ctaPrimary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="halo rounded-sm bg-accent px-5 py-3 text-sm font-medium text-[#06120f] transition-colors duration-200 hover:bg-[#3ddcc2]"
          >
            {hero.ctaPrimary.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="rounded-sm border border-line px-5 py-3 text-sm font-medium text-primary transition-colors duration-200 hover:border-accent-dim hover:text-accent"
          >
            {hero.ctaSecondary.label}
          </a>
        </motion.div>

        <motion.dl
          variants={item}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden bg-base/85 px-5 py-6 backdrop-blur-md"
              onMouseMove={trackSpotlight}
            >
              <span aria-hidden="true" className="spotlight pointer-events-none" />
              <dt className="relative font-display text-3xl font-semibold text-accent md:text-4xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </dt>
              <dd className="relative mt-2 font-mono text-2xs uppercase leading-relaxed tracking-[0.12em] text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
