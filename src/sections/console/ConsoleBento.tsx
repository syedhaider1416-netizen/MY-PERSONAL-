"use client";

import { motion, useReducedMotion } from "framer-motion";
import { trackSpotlight } from "@/components/explore/spotlight";
import { services } from "@/content";

// Bento: first card spans two columns so the grid reads as a system, not a list.
const span = ["md:col-span-2", "", "", "", "md:col-span-2"];

export function ConsoleBento() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="border-b border-line bg-raised/20">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-2xs uppercase tracking-[0.2em] text-accent">
              Services
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-primary md:text-3xl">
              What I build
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Five capabilities, one pipeline. Most clients need two or three working together.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={trackSpotlight}
              className={`group relative overflow-hidden rounded-md border border-line bg-base/85 p-5 backdrop-blur-md transition-colors duration-300 hover:border-accent-dim md:p-6 ${span[i] ?? ""}`}
            >
              <span aria-hidden="true" className="spotlight pointer-events-none" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="relative flex items-start justify-between gap-4">
                <h3 className="font-display text-lg font-semibold text-primary md:text-xl">
                  {service.name}
                </h3>
                <span className="shrink-0 font-mono text-2xs text-accent-dim">
                  {service.index}
                </span>
              </div>

              <p className="relative mt-3 text-sm leading-relaxed text-primary">
                {service.pitch}
              </p>
              <p className="relative mt-2 text-xs leading-relaxed text-muted">
                {service.detail}
              </p>

              <p className="relative mt-4 font-mono text-2xs uppercase tracking-[0.15em] text-muted">
                {service.tag}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
