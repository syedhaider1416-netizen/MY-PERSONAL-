import type { MouseEvent } from "react";

/**
 * Writes the pointer's position, relative to the hovered card, into CSS custom
 * properties the `.spotlight` overlay reads. Kept as a plain handler rather than
 * a hook so cards stay server-renderable apart from the event binding, and so
 * there's no per-card state to re-render on every mouse move.
 */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--my", `${e.clientY - rect.top}px`);
}
