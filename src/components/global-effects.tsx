"use client";

import LightRays from '@/components/ui/LightRays';
import PixelTrail from '@/components/PixelTrail';

export default function GlobalEffects() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
          <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
          />
      </div>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
          <PixelTrail
              gridSize={40}
              trailSize={0.15}
              maxAge={300}
              interpolate={5}
              color="#fff"
              gooeyFilter={{ id: "custom-goo-filter", strength: 1.5 }}
          />
      </div>
    </>
  );
}
