"use client";

import dynamic from 'next/dynamic';

const GlobalEffects = dynamic(() => import('@/components/global-effects'), {
  ssr: false,
});

export default function GlobalEffectsLoader() {
  return <GlobalEffects />;
}
