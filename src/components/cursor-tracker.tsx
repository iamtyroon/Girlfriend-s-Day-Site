"use client";

import { useEffect } from 'react';

export default function CursorTracker() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (document.body) {
        document.body.style.setProperty('--cursor-x', `${e.clientX}px`);
        document.body.style.setProperty('--cursor-y', `${e.clientY}px`);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}
