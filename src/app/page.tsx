"use client";

import CanonEvent from '@/components/canon-event';
import MainLayout from './main-layout';
import StageOfUsPage from './stage-of-us/page';
import { useState } from 'react';

export default function Home() {
    const [showMain, setShowMain] = useState(false);

    if (showMain) {
        return (
            <MainLayout>
                <StageOfUsPage />
            </MainLayout>
        );
    }

    return <CanonEvent onEnterMain={() => setShowMain(true)} />;
}
