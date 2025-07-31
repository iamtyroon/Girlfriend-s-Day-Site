import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import CursorTracker from '@/components/cursor-tracker';
import LightRays from '@/components/ui/LightRays';
import PixelTrail from '@/components/PixelTrail';

export const metadata: Metadata = {
  title: 'A Canon Event',
  description: "A little adventure for Praise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CursorTracker />
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
            <LightRays
                raysOrigin="top-center"
                raysColor="#00ffff"
                raysSpeed={1.5}
                lightSpread={0.8}
                rayLength={1.2}
                followMouse={true}
                mouseInfluence={0.1}
                noiseAmount={0.1}
                distortion={0.05}
                className="custom-rays"
            />
        </div>
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
