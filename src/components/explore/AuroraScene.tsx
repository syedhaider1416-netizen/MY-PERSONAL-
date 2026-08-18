"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Live aurora field: a full-screen fragment shader that flows continuously.
 *
 * Rendered at a fraction of device resolution (RESOLUTION_SCALE) — the image is
 * all soft gradients, so the downscale is invisible but cuts fragment cost by
 * roughly 4x. The loop stops whenever the tab is hidden so it never burns
 * battery in the background.
 */

const RESOLUTION_SCALE = 0.5;

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform float u_time;
  uniform vec2 u_resolution;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // 2D simplex noise
  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash2(i)), dot(b, hash2(i + o)), dot(c, hash2(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      v += amp * noise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv;
    p.x *= u_resolution.x / u_resolution.y;
    p *= 1.7;

    float t = u_time * 0.055;

    // domain warping: the field folds through itself, which is what reads as
    // "flowing" rather than "sliding"
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(3.2, 1.3) - t * 0.7));
    float f = fbm(p + 2.4 * q + vec2(t * 0.35, 0.0));

    vec3 base = vec3(0.043, 0.102, 0.180);
    vec3 teal = vec3(0.161, 0.784, 0.690);
    vec3 blue = vec3(0.290, 0.463, 0.863);

    vec3 col = base;

    // blue underlay wherever the warp is strong
    col = mix(col, blue, clamp(length(q) * 0.9, 0.0, 1.0) * 0.85);

    // teal ribbons: the bright band the eye actually reads as "aurora"
    float ribbon = smoothstep(-0.10, 0.55, f);
    col = mix(col, teal, ribbon * 0.80);

    // a hotter core inside the brightest part of each ribbon
    float core = smoothstep(0.45, 0.80, f);
    col += teal * core * 0.35;

    // gentle falloff at the very edges only — the field stays bright enough
    // to actually be seen
    float vig = smoothstep(1.45, 0.35, length(uv - 0.5));
    col *= mix(0.70, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function AuroraScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    } catch {
      return;
    }

    const sizeOf = () => ({
      w: Math.max(mount.clientWidth, 1),
      h: Math.max(mount.clientHeight, 1),
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2) * RESOLUTION_SCALE);
    {
      const { w, h } = sizeOf();
      renderer.setSize(w, h);
    }
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: {
        value: (() => {
          const { w, h } = sizeOf();
          const dpr = renderer.getPixelRatio();
          return new THREE.Vector2(w * dpr, h * dpr);
        })(),
      },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frame = 0;
    let running = true;
    const clock = { start: performance.now() };

    function renderFrame() {
      uniforms.u_time.value = (performance.now() - clock.start) / 1000;
      renderer.render(scene, camera);
    }

    function loop() {
      if (!running) return;
      renderFrame();
      frame = requestAnimationFrame(loop);
    }

    function handleResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(
        window.innerWidth * renderer.getPixelRatio(),
        window.innerHeight * renderer.getPixelRatio()
      );
      if (!running) renderFrame();
    }

    // don't animate behind a hidden tab
    function handleVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        loop();
      }
    }

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
