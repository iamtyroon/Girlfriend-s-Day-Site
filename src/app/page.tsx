"use client";

import MainLayout from './main-layout';
import { useState } from 'react';
import CanonEvent from '@/components/canon-event';
import LetterPage from './letter/page';

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
            <CanonEvent onEnterMain={() => setShowMain(true)} />
        </div>
    );
}
