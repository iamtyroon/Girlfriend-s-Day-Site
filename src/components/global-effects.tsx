"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Effects
import LightRays from "@/components/ui/LightRays";
const PixelTrail = dynamic(() => import("@/components/PixelTrail"), { ssr: false });

export default function GlobalEffects() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Promote the overlay to its own layer for stable performance.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prev = el.style.willChange;
    el.style.willChange = "transform, opacity";
    el.style.transform = "translateZ(0)";
    return () => {
      el.style.willChange = prev;
      el.style.transform = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="effects-overlay"
    >
      {/* Underlay: light rays */}
      <LightRays
        className="effects-layer effects-rays"
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={1.2}
        lightSpread={0.9}
        rayLength={1.3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.06}
        distortion={0.04}
      />

      {/* Overlay: pixel trail (alpha). Force non-interactive canvas */}
      <div className="effects-layer effects-trail">
        <PixelTrail
          color="#a8fff7"
          gridSize={42}
          trailSize={0.12}
          maxAge={260}
          interpolate={5}
          // Ensure the R3F canvas does not intercept input
          canvasProps={{
            className: "w-full h-full",
            style: { width: "100%", height: "100%", pointerEvents: "none" },
            // Disable R3F event system so no handlers capture pointer events
            // @ts-ignore - allowed to unset events
            events: undefined,
          }}
          glProps={{
            antialias: false,
            powerPreference: "high-performance",
            alpha: true,
            desynchronized: true,
            premultipliedAlpha: false,
          }}
        />
      </div>
    </div>
  );
}
