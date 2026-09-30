import React from 'react';
import type { Metadata } from 'next';
import { PuzzleProvider } from '@/context/PuzzleContext';
import { Navigation } from '@/components/ui/Navigation';
import { ConnectModal } from '@/components/ui/ConnectModal';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'AxIyon Sovereign Launch Portal',
  description: 'AxIyon Enterprise air-gapped system launch console and GTM telemetry visualization ecosystem.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased min-h-screen">
        <div className="grain-overlay" />
        <PuzzleProvider>
          <Navigation />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <ConnectModal />
        </PuzzleProvider>
      </body>
    </html>
  );
}
