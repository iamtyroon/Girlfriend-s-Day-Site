"use client"
import { Dock } from '@/components/dock';
import PixelTrail from '@/components/PixelTrail';
import { useEffect, useRef } from 'react';

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
    
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Ensure this only runs on the client
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio('/assets/audio/pixel-main-theme.mp3');
            audioRef.current.loop = true;
            audioRef.current.volume = 0.2; // Set volume to 20%
            
            // Attempt to play the audio
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Autoplay started!
                }).catch(error => {
                    // Autoplay was prevented.
                    console.log("Autoplay prevented: ", error);
                    // You might want to show a "Click to enable sound" button here.
                });
            }
        }
        
        return () => {
            // Cleanup: pause and nullify on component unmount
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []);

    return (
        <>
            <div className="bg-background text-foreground min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <PixelTrail
                        gridSize={72}
                        trailSize={0.05}
                        maxAge={120}
                        interpolate={5}
                        color="#ffffff"
                    />
                </div>
                <main className="pb-24 relative z-10">
                    {children}
                </main>
                <Dock navItems={navItems} />
            </div>
        </>
    );
}
