"use client";

import dynamic from 'next/dynamic';

const PixelTrail = dynamic(() => import('./pixel-trail'), {
  ssr: false,
});

export default function PixelTrailClient() {
  return <PixelTrail />;
}
