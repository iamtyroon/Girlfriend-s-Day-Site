"use client";

import CanonEvent from '@/components/canon-event';
import MainLayout from './main-layout';
import { useState } from 'react';
import StageOfUsPage from './stage-of-us/page';

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
        </div>
    );
}
