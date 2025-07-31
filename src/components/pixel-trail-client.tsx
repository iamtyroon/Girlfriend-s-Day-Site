"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const PixelTrail = dynamic(() => import('./pixel-trail'), {
  ssr: false,
});

export default function PixelTrailClient() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <PixelTrail />;
}
