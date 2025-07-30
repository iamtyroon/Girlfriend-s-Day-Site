"use client"
import { useState } from 'react';
import PixelTrail from '@/components/pixel-trail';
import { Dock } from '@/components/dock';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [showPixelTrail, setShowPixelTrail] = useState(true);

    const navItems = [
        { href: "/stage-of-us", title: "The Stage of Us", icon: "/assets/icons/music.png" },
        { href: "/soft-side", title: "The Soft Side of You", icon: "/assets/icons/teddy-bear.png" },
        { href: "/where-you-bloom", title: "Where You Bloom", icon: "/assets/icons/flower.png" },
        { href: "/letter", title: "A Note for You", icon: "/assets/icons/letter.png" },
        { href: "/memory-arcade", title: "Memory Arcade", icon: "/assets/icons/joystick.png" },
        { href: "/gallery-wall", title: "Gallery Wall", icon: "/assets/icons/star.png" },
        { href: "/settings", title: "Settings", icon: "/assets/icons/cog.png" },
    ];

    return (
        <>
            {showPixelTrail && <PixelTrail />}
            <div className="bg-background text-foreground min-h-screen">
                <main className="pb-24">
                    {children}
                </main>
                <Dock navItems={navItems} />
            </div>
        </>
    );
}
