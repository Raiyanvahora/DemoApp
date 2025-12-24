import type { Metadata, Viewport } from 'next';
import { StoreProvider } from '@/lib/store';
import BottomNav from '@/components/BottomNav';
import ServiceWorkerRegister from './sw-register';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sharma Grocery - Membership App',
  description: 'Your neighborhood grocery store with free delivery membership',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Sharma Grocery',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#16a34a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        <StoreProvider>
          <ServiceWorkerRegister />
          <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl">
            {children}
            <BottomNav />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
