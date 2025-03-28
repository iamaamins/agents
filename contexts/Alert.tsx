'use client';

import { Alert } from '@/types';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type AlertContext = {
  alert: Alert | null;
  setAlert: Dispatch<SetStateAction<Alert | null>>;
};

const AlertContext = createContext({} as AlertContext);
export const useAlert = () => useContext(AlertContext);

export default function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<Alert | null>(null);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
