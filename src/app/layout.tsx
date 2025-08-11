import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import CursorTracker from '@/components/cursor-tracker';

export const metadata: Metadata = {
  title: 'A Canon Event',
  description: "A little adventure for Praise.",
  keywords: ['girlfriend', 'valentine', 'love', 'adventure', 'interactive'],
  authors: [{ name: 'Tesfa' }],
  robots: {
    index: false, // Keep private
    follow: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
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
        {children}
        <Toaster />

          {/* Mount a single, persistent audio element at the document body level so it does not restart on route change */}
          <audio
            id="global-bg-audio"
            src="/assets/audio/Pixelmaintheme.mp3"
            preload="auto"
            loop
            // Note: volume is controlled via script to ensure 0.2 after unmute; some browsers ignore initial volume attribute.
          />

          <script
            // Hydration-safe inline script to initialize/persist audio across client navigations.
            dangerouslySetInnerHTML={{
              __html: `
(function() {
  try {
    var audio = document.getElementById('global-bg-audio');
    if (!audio) return;

    // Create a global controller only once.
    if (!window.__BG_AUDIO__) {
      var preferredMuted = localStorage.getItem('bgAudioMuted') === 'true';
      audio.volume = 0.2;
      audio.muted = preferredMuted;

      var tryPlay = function() {
        if (!audio) return;
        var p = audio.play();
        if (p && typeof p.catch === 'function') { p.catch(function(){}); }
      };

      // Autoplay attempt
      tryPlay();

      // First interaction unlock for autoplay
      var onFirstInteract = function() {
        if (!preferredMuted) {
          audio.muted = false;
          audio.volume = 0.2;
          tryPlay();
        }
        window.removeEventListener('pointerdown', onFirstInteract);
        window.removeEventListener('keydown', onFirstInteract);
      };
      window.addEventListener('pointerdown', onFirstInteract, { once: true });
      window.addEventListener('keydown', onFirstInteract, { once: true });

      window.__BG_AUDIO__ = {
        mute: function() { audio.muted = true; localStorage.setItem('bgAudioMuted', 'true'); },
        unmute: function() { audio.muted = false; audio.volume = 0.2; localStorage.setItem('bgAudioMuted', 'false'); tryPlay(); },
        isMuted: function() { return audio.muted; }
      };
    } else {
      // If controller already exists (navigated client-side), ensure the element is wired to it.
      var muted = localStorage.getItem('bgAudioMuted') === 'true';
      audio.volume = 0.2;
      audio.muted = muted;
    }
  } catch(e) { /* noop */ }
})();`
            }}
          />
      </body>
    </html>
  );
}
