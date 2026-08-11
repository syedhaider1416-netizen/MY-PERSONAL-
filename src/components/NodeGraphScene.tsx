"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Sparse node graph with signal pulses traveling along edges — reads as
 * "voice agent -> workflow -> CRM -> output" rather than a generic sphere.
 * Only mounted on desktop-class viewports with motion enabled; see NodeGraph.tsx.
 */
export function NodeGraphScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    let disposed = false;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // ---- build a small, deliberate graph: layered "pipeline" topology ----
    const layers = [
      { x: -3.2, count: 3 }, // inputs: voice / whatsapp / web
      { x: -1.0, count: 4 }, // agents: claude / n8n / voice agent / router
      { x: 1.2, count: 3 }, // systems: crm / calendar / db
      { x: 3.4, count: 2 }, // outputs: booked call / campaign
    ];

    const nodePositions: THREE.Vector3[] = [];
    const layerIndices: number[][] = [];

    layers.forEach((layer) => {
      const indices: number[] = [];
      const spread = layer.count > 1 ? 2.4 : 0;
      for (let i = 0; i < layer.count; i++) {
        const y = layer.count > 1 ? (i / (layer.count - 1) - 0.5) * spread : 0;
        const z = (Math.random() - 0.5) * 1.1;
        indices.push(nodePositions.length);
        nodePositions.push(new THREE.Vector3(layer.x + (Math.random() - 0.5) * 0.3, y, z));
      }
      layerIndices.push(indices);
    });

    const edges: [number, number][] = [];
    for (let l = 0; l < layerIndices.length - 1; l++) {
      const from = layerIndices[l];
      const to = layerIndices[l + 1];
      from.forEach((fi) => {
        const connections = 1 + Math.floor(Math.random() * Math.min(2, to.length));
        const shuffled = [...to].sort(() => Math.random() - 0.5).slice(0, connections);
        shuffled.forEach((ti) => edges.push([fi, ti]));
      });
    }

    const group = new THREE.Group();
    scene.add(group);

    // node points
    const nodeGeometry = new THREE.BufferGeometry().setFromPoints(nodePositions);
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x29c8b0,
      size: 0.11,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95,
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    group.add(nodePoints);

    // soft glow ring per node (cheap: single additive sprite material reused)
    const glowGeometry = new THREE.BufferGeometry().setFromPoints(nodePositions);
    const glowMaterial = new THREE.PointsMaterial({
      color: 0x29c8b0,
      size: 0.34,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.Points(glowGeometry, glowMaterial));

    // static edge lines, dim
    const linePositions: number[] = [];
    edges.forEach(([a, b]) => {
      const pa = nodePositions[a];
      const pb = nodePositions[b];
      linePositions.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x1c3a56,
      transparent: true,
      opacity: 0.6,
    });
    group.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    // ---- signal pulses traveling along random edges ----
    const PULSE_COUNT = 14;
    const pulseGeometry = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(PULSE_COUNT * 3);
    pulseGeometry.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMaterial = new THREE.PointsMaterial({
      color: 0x6df2df,
      size: 0.14,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial);
    group.add(pulsePoints);

    const pulses = Array.from({ length: PULSE_COUNT }, () => ({
      edge: edges[Math.floor(Math.random() * edges.length)],
      t: Math.random(),
      speed: 0.25 + Math.random() * 0.25,
    }));

    group.rotation.y = -0.15;

    const clock = new THREE.Clock();

    const animate = () => {
      if (disposed) return;
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      group.rotation.y = -0.15 + Math.sin(elapsed * 0.08) * 0.12;
      group.rotation.x = Math.sin(elapsed * 0.06) * 0.04;

      const positions = pulseGeometry.attributes.position.array as Float32Array;
      pulses.forEach((pulse, i) => {
        pulse.t += delta * pulse.speed;
        if (pulse.t >= 1) {
          pulse.t = 0;
          pulse.edge = edges[Math.floor(Math.random() * edges.length)];
        }
        const [a, b] = pulse.edge;
        const pa = nodePositions[a];
        const pb = nodePositions[b];
        positions[i * 3] = pa.x + (pb.x - pa.x) * pulse.t;
        positions[i * 3 + 1] = pa.y + (pb.y - pa.y) * pulse.t;
        positions[i * 3 + 2] = pa.z + (pb.z - pa.z) * pulse.t;
      });
      pulseGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      nodeGeometry.dispose();
      glowGeometry.dispose();
      lineGeometry.dispose();
      pulseGeometry.dispose();
      nodeMaterial.dispose();
      glowMaterial.dispose();
      lineMaterial.dispose();
      pulseMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}
