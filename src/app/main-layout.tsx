"use client"
import { Dock } from '@/components/dock';
import dynamic from 'next/dynamic';

// Lazy load heavy graphics components for better performance
const LightRays = dynamic(() => import('@/components/ui/LightRays'), { 
  ssr: false,
  loading: () => null
});

export default function MainLayout({ children }: { children: React.ReactNode }) {
    
    const navItems = [
        { href: "/stage-of-us", title: "The Stage of Us", icon: "/assets/icons/music-notes.png" },
        { href: "/soft-side", title: "The Soft Side of You", icon: "/assets/icons/teddy-bear.png" },
        { href: "/countdown", title: "The Countdown", icon: "/assets/icons/flower.png" },
        { href: "/letter", title: "A Note for You", icon: "/assets/images/scroll.png" },
        { href: "/memory-arcade", title: "Memory Arcade", icon: "/assets/icons/arcade.png" },
        { href: "/quote-butterfly", title: "Quote Butterfly", icon: "/assets/icons/butterfly.png" },
        { href: "/settings", title: "Settings", icon: "/assets/icons/cog.png" },
    ];

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

            
            <div className="bg-background text-foreground min-h-screen relative overflow-hidden">
                <main className="pb-24 relative z-10">
                    {children}
                </main>
                <Dock navItems={navItems} />
            </div>
        </>
    );
}
