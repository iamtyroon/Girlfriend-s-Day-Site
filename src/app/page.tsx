"use client";

import CanonEvent from '@/components/canon-event';
import MainLayout from './main-layout';
import StageOfUsPage from './stage-of-us/page';
import { useState } from 'react';
import PixelTrail from '@/components/PixelTrail';

export default function Home() {
    const [showMain, setShowMain] = useState(false);

    if (showMain) {
        return (
            <MainLayout>
                <StageOfUsPage />
            </MainLayout>
        );
    }

    return (
        <div>
            <CanonEvent onEnterMain={() => setShowMain(true)} />
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
        </div>
    );
}
