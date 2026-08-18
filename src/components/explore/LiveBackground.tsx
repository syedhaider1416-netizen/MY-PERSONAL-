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
 * Live aurora, scoped to the section it's placed in (the hero).
 *
 * Deliberately *not* page-wide: at full strength the field pushes muted body
 * text under 3:1 contrast, and veiling it enough to fix that dims it back to
 * invisible. Scoping it to the hero — which has room and only large, bright
 * text — keeps it vivid where it's seen and keeps dense content readable.
 * The rest of the page gets the calm CSS ambient instead.
 *
 * Falls back to the CSS orbs when WebGL is unavailable or motion is reduced,
 * the same split NodeGraph uses.
 */
export function LiveBackground() {
  const reducedMotion = useReducedMotion();
  const hasWebGL = useSyncExternalStore(noopSubscribe, getWebGLSnapshot, getServerSnapshot);

  const canUseShader = hasWebGL && !reducedMotion;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <AmbientBackground embedded />
      {canUseShader ? (
        <div className="ambient-shader">
          <AuroraScene />
        </div>
      ) : null}
      <div className="ambient-grid" />
      <div className="ambient-grain" />
    </div>
  );
}
