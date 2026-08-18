"use client";

import { animate, motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const shouldReduceMotion = useReducedMotion();
  // Starts at the real number so the pre-hydration and no-JS markup states the
  // true figure; it only drops to zero once we know we're going to animate it.
  const count = useMotionValue(to);
  const rounded = useTransform(count, (v) => Math.round(v).toString());
  const armed = useRef(false);
  const started = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion || started.current) return;
    armed.current = true;
    count.set(0);
  }, [shouldReduceMotion, count]);

  function start() {
    if (started.current || !armed.current) return;
    started.current = true;
    animate(count, to, { duration: 1.1, ease: [0.16, 1, 0.3, 1] });
  }

  return (
    <motion.span
      className="tabular-nums"
      onViewportEnter={start}
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}
