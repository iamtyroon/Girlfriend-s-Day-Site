import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import CursorTracker from '@/components/cursor-tracker';
import GlobalEffectsLoader from '@/components/global-effects-loader';
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
        <PixelTrail
          color="#9323c7"
          gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
          gridSize={50}
          trailSize={0.1}
          maxAge={250}
          interpolate={5}
        />
        <CursorTracker />
        <GlobalEffectsLoader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
