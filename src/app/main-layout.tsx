"use client"
import { useState } from 'react';
import PixelTrail from '@/components/pixel-trail';
import { Dock } from '@/components/dock';
import { Flower, GitBranch, Heart, MessageCircle, Music, Star, Cog } from 'lucide-react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [showPixelTrail, setShowPixelTrail] = useState(true);

    const navItems = [
        { href: "/stage-of-us", title: "The Stage of Us", icon: Music },
        { href: "/soft-side", title: "The Soft Side of You", icon: Heart },
        { href: "/where-you-bloom", title: "Where You Bloom", icon: Flower },
        { href: "/letter", title: "A Note for You", icon: MessageCircle },
        { href: "/memory-arcade", title: "Memory Arcade", icon: GitBranch },
        { href: "/gallery-wall", title: "Gallery Wall", icon: Star },
        { href: "/settings", title: "Settings", icon: Cog },
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
