"use client";

import { useRef } from 'react';
import PixelTrail from './PixelTrail';
import CursorTracker from './cursor-tracker';
import GlobalEffectsLoader from './global-effects-loader';
import { Toaster } from './ui/toaster';

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const mainRef = useRef(null);

  return (
    <body className="font-body antialiased">
      <div ref={mainRef} style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
        <PixelTrail
          eventSource={mainRef}
          gridSize={50}
          trailSize={0.1}
          maxAge={250}
          interpolate={5}
          color="#fff"
          gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
        />
        <CursorTracker />
        <GlobalEffectsLoader />
        {children}
        <Toaster />
      </div>
    </body>
  );
}
