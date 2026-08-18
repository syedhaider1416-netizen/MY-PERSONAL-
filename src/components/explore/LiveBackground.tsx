"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { AmbientBackground } from "./AmbientBackground";
import { useReducedMotion } from "@/lib/useReducedMotion";

const AuroraScene = dynamic(() => import("./AuroraScene").then((m) => m.AuroraScene), {
  ssr: false,
});

function noopSubscribe() {
  return () => {};
}

function getWebGLSnapshot() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

/**
 * Live aurora behind the entire page.
 *
 * Fixed to the viewport rather than scoped to a section, so it covers every
 * screen as you scroll instead of ending below the hero. Readability is
 * handled by the veil above the shader plus opaque-ish content surfaces —
 * not by dimming the field, which only makes it invisible.
 *
 * Falls back to the CSS orbs when WebGL is unavailable or motion is reduced,
 * the same split NodeGraph uses.
 */
export function LiveBackground() {
  const reducedMotion = useReducedMotion();
  const hasWebGL = useSyncExternalStore(noopSubscribe, getWebGLSnapshot, getServerSnapshot);

  const canUseShader = hasWebGL && !reducedMotion;

  return (
    <div className="ambient" aria-hidden="true">
      <AmbientBackground embedded />
      {canUseShader ? (
        <div className="ambient-shader">
          <AuroraScene />
        </div>
      ) : null}
      <div className="ambient-grid" />
      <div className="ambient-veil" />
      <div className="ambient-grain" />
    </div>
  );
}
