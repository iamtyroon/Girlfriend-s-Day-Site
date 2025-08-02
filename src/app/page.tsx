"use client";

import MainLayout from './main-layout';
import { useState } from 'react';
import CanonEvent from '@/components/canon-event';
import LetterPage from './letter/page';
import PixelTrail from "@/components/PixelTrail";

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
        <div>
            {/* Remove local PixelTrail; GlobalEffects provides a full-viewport overlay above all UI */}
            <CanonEvent onEnterMain={() => setShowMain(true)} />
        </div>
    );
}
