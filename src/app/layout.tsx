import type {Metadata} from 'next';
import './globals.css';
import ClientBody from '@/components/ClientBody';

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
      <ClientBody>
        {children}
      </ClientBody>
    </html>
  );
}
