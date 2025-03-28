'use client';

import { CookieConsent } from '@/types';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type CookieConsentContext = {
  cookieConsent: CookieConsent | null;
  showCookieManagement: boolean;
  setCookieConsent: Dispatch<SetStateAction<CookieConsent | null>>;
  setShowCookieManagement: Dispatch<SetStateAction<boolean>>;
};

const CookieConsentContext = createContext({} as CookieConsentContext);
export const useCookieConsent = () => useContext(CookieConsentContext);

export default function CookieConsentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(
    null
  );
  const [showCookieManagement, setShowCookieManagement] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('CookieConsent');
    setCookieConsent(savedConsent ? JSON.parse(savedConsent) : null);
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        cookieConsent,
        showCookieManagement,
        setCookieConsent,
        setShowCookieManagement,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}
