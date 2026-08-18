"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReelPlayer } from "@/components/ReelPlayer";
import { trackSpotlight } from "@/components/explore/spotlight";
import { work, videoReel, process } from "@/content";

export function ConsoleWork() {
  const shouldReduceMotion = useReducedMotion();
  const fade = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <>
      <section id="work" className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-8">
            <p className="font-mono text-2xs uppercase tracking-[0.2em] text-accent">
              Selected work
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-primary md:text-3xl">
              Live products, not mockups
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {work.map((project) => (
              <motion.a
                key={project.id}
                {...fade}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={trackSpotlight}
                className="group relative flex flex-col overflow-hidden rounded-md border border-line bg-raised/85 p-5 backdrop-blur-md transition-colors duration-300 hover:border-accent-dim md:p-6"
              >
                <span aria-hidden="true" className="spotlight pointer-events-none" />
                <div className="relative flex items-center justify-between gap-4">
                  <span className="font-mono text-2xs uppercase tracking-[0.15em] text-accent">
                    {project.kind}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                  >
                    →
                  </span>
                </div>
                <h3 className="relative mt-3 font-display text-xl font-semibold text-primary">
                  {project.name}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-line px-2 py-0.5 font-mono text-2xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="reel" className="border-b border-line bg-raised/20">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-8">
            <p className="font-mono text-2xs uppercase tracking-[0.2em] text-accent">Reel</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-primary md:text-3xl">
              {videoReel.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted">{videoReel.description}</p>
          </div>

          <div className="grid items-start gap-6 md:grid-cols-[minmax(0,260px)_1fr]">
            {videoReel.items.map((reel) => (
              <div key={reel.id} className="mx-auto w-full max-w-[320px] md:max-w-none">
                <ReelPlayer
                  title={reel.title}
                  kind={reel.kind}
                  videoSrc={reel.videoSrc}
                  poster={reel.poster}
                  orientation={reel.orientation}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-8">
            <p className="font-mono text-2xs uppercase tracking-[0.2em] text-accent">
              How it works
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-primary md:text-3xl">
              Four steps, in order
            </h2>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-4">
            {process.map((step) => (
              <li key={step.step} className="bg-base p-5">
                <span className="font-mono text-2xs text-accent">{step.step}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-primary">
                  {step.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
