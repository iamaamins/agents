import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import { robots } from '@/lib/metadata';
import CookieConsentProvider from '@/contexts/CookieConsent';
import AlertProvider from '@/contexts/Alert';
import AuthProvider from '@/contexts/Auth';
import Alert from '@/components/layout/Alert';
import CookieBanner from '@/components/layout/CookieBanner';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';

const hankenGrotesk = Hanken_Grotesk({ subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
  themeColor: [
    { media: 'prefers-color-scheme: dark', color: '#333c4d' },
    { media: 'prefers-color-scheme: light', color: '#f6f6f6' },
  ],
};

export const metadata: Metadata = {
  authors: [{ name: 'Alamin Shaikh' }],
  keywords: 'UPDATE: Keywords',
  robots: { index: true, ...robots },
  twitter: { card: 'summary_large_image' },
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/layout/favicon/favicon-96x96.png',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/layout/favicon/favicon.svg',
    },
    {
      rel: 'shortcut icon',
      url: '/layout/favicon/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/layout/favicon/apple-touch-icon.png',
    },
  ],
  manifest: '/layout/favicon/site.webmanifest',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <CookieConsentProvider>
        <head>
          <GoogleAnalytics />
        </head>
        <body className={`${hankenGrotesk.className} antialiased`}>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function () {
                let theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = 'light';
                  localStorage.setItem('theme', theme);
                }
                document.documentElement.classList.add(theme);
              })();
            `,
            }}
          />
          <AlertProvider>
            <AuthProvider>
              {children}
              <Alert />
            </AuthProvider>
          </AlertProvider>
          <CookieBanner />
          <script src='https://assets.lemonsqueezy.com/lemon.js' defer />
        </body>
      </CookieConsentProvider>
    </html>
  );
}
