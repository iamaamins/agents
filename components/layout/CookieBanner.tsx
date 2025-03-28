'use client';

import { FaCookieBite } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsent';

export default function CookieBanner() {
  const { showCookieManagement, setCookieConsent, setShowCookieManagement } =
    useCookieConsent();
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
  });

  function savePreferences() {
    localStorage.setItem('CookieConsent', JSON.stringify(preferences));
    setCookieConsent(preferences);
    setShowCookieBanner(false);
  }

  useEffect(() => {
    if (!localStorage.getItem('CookieConsent')) setShowCookieBanner(true);
  }, []);

  return (
    <div
      className={`border-slight-gray fixed bottom-2 left-1/2 z-10 w-[96%] -translate-x-1/2 rounded-md border bg-silver-charcoal-scheme p-3 text-sm md:max-w-lg ${showCookieBanner ? 'block' : 'hidden'}`}
    >
      <div
        className={`space-y-3 overflow-hidden transition-all duration-300 ease-in-out ${
          showCookieManagement ? 'max-h-fit opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          maxHeight: showCookieManagement ? '320px' : '0px',
        }}
      >
        <div className='flex items-start gap-2'>
          <input
            checked
            readOnly
            type='checkbox'
            id='essential'
            className='mt-2'
          />
          <div className='space-y-1'>
            <label htmlFor='essential' className='text-base font-semibold'>
              Essential Cookies
            </label>
            <p className='opacity-90'>
              These cookies are essential for the core functionality of our
              website, including enabling features like secure area access.
            </p>
          </div>
        </div>
        <div className='flex items-start gap-2'>
          <input
            id='analytics'
            type='checkbox'
            className='mt-2'
            checked={preferences.analytics}
            onChange={() =>
              setPreferences((prevState) => ({
                ...prevState,
                analytics: !prevState.analytics,
              }))
            }
          />
          <div className='space-y-1'>
            <label htmlFor='analytics' className='text-base font-semibold'>
              Analytics Cookies
            </label>
            <p className='opacity-90'>
              These cookies collect information to help us understand how our
              website is used and to provide you with a personalized site
              experience.
            </p>
          </div>
        </div>
        <div className='space-x-2'>
          <button
            className='rounded-md bg-peach px-4 py-2 text-base font-medium text-black'
            onClick={savePreferences}
          >
            Save Preferences
          </button>
        </div>
      </div>
      {!showCookieManagement && (
        <div className='flex w-full flex-col items-center gap-3 text-center'>
          <FaCookieBite color='#ff8360' size={20} />
          <p className='opacity-90'>
            We use essential cookies to ensure our site functions properly. With
            your consent, we also use non-essential cookies to enhance your
            experience, personalize content, and analyze website traffic.
          </p>
          <div className='space-x-2'>
            <button
              className='rounded-full bg-peach px-6 py-2 font-medium text-black'
              onClick={savePreferences}
            >
              Accept
            </button>
            <button
              className='border-slight-gray rounded-full border px-6 py-2'
              onClick={() => setShowCookieManagement(true)}
            >
              Manage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
