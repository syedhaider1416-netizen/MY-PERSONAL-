"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { NodeGraphStatic } from "./NodeGraphStatic";
import { useReducedMotion } from "@/lib/useReducedMotion";

const NodeGraphScene = dynamic(
  () => import("./NodeGraphScene").then((mod) => mod.NodeGraphScene),
  { ssr: false }
);

function subscribeResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getViewportSnapshot() {
  return window.innerWidth >= 768;
}

function getServerViewportSnapshot() {
  return false;
}

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

function getServerWebGLSnapshot() {
  return false;
}

export function NodeGraph() {
  const reducedMotion = useReducedMotion();
  const isDesktopViewport = useSyncExternalStore(
    subscribeResize,
    getViewportSnapshot,
    getServerViewportSnapshot
  );
  const hasWebGL = useSyncExternalStore(noopSubscribe, getWebGLSnapshot, getServerWebGLSnapshot);

  const canUse3D = isDesktopViewport && hasWebGL && !reducedMotion;

  return canUse3D ? <NodeGraphScene /> : <NodeGraphStatic />;
}
