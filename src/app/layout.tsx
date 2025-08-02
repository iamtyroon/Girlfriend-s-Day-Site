import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import CursorTracker from '@/components/cursor-tracker';
import GlobalEffectsLoader from '@/components/global-effects-loader';

// Stagewise toolbar (Next.js) - renders only in development and on the client
import { StagewiseToolbar } from '@stagewise/toolbar-next';
import ReactPlugin from '@stagewise-plugins/react';

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
        {/* Global overlay with LightRays (underlay) + PixelTrail (overlay), persists across routes */}
        <GlobalEffectsLoader />
        {children}
        <Toaster />
        {/* Stagewise toolbar mounts once at app root; dev-only behavior handled by the package */}
        <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      </body>
    </html>
  );
}
