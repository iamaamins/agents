'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/contexts/CookieConsent';

export default function GoogleAnalytics() {
  const { cookieConsent } = useCookieConsent();

  return (
    <>
      {cookieConsent?.analytics && (
        <>
          <Script
            async
            strategy='afterInteractive'
            src='https://www.googletagmanager.com/gtag/js?id=G-Q1E94LTX2F'
          />
          <Script
            id='google-analytics'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q1E94LTX2F');`,
            }}
          />
        </>
      )}
    </>
  );
}
