"use client";

import MainLayout from './main-layout';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load components for better performance
const CanonEvent = dynamic(() => import('@/components/canon-event'), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});
const LetterPage = dynamic(() => import('./letter/page'), { ssr: false });
const LightRays = dynamic(() => import('@/components/ui/LightRays'), { 
  ssr: false,
  loading: () => null
});

export default function Home() {
    const [showMain, setShowMain] = useState(false);

    if (showMain) {
        return (
            <MainLayout>
                <LetterPage />
            </MainLayout>
        );
    }

    return (
        <>
            {/* Background Light Rays */}
            <div style={{ 
                position: 'fixed',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none'
            }}>
                <LightRays
                    className="w-full h-full"
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
            </div>

            
            <div>
                <CanonEvent onEnterMain={() => setShowMain(true)} />
            </div>
        </>
    );
}
