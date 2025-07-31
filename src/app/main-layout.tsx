"use client"
import { useState } from 'react';
import { Dock } from '@/components/dock';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const navItems = [
        { href: "/stage-of-us", title: "The Stage of Us", icon: "/assets/icons/music-notes.png" },
        { href: "/soft-side", title: "The Soft Side of You", icon: "/assets/icons/teddy-bear.png" },
        { href: "/where-you-bloom", title: "Where You Bloom", icon: "/assets/icons/flower.png" },
        { href: "/letter", title: "A Note for You", icon: "/assets/images/scroll.png" },
        { href: "/memory-arcade", title: "Memory Arcade", icon: "/assets/icons/arcade.png" },
        { href: "/gallery-wall", title: "Gallery Wall", icon: "/assets/icons/butterfly.png" },
        { href: "/settings", title: "Settings", icon: "/assets/icons/cog.png" },
    ];

    return (
        <>
            <div className="bg-background text-foreground min-h-screen">
                <main className="pb-24">
                    {children}
                </main>
                <Dock navItems={navItems} />
            </div>
        </>
    );
}
