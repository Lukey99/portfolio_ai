'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { fr } from '@/lib/i18n/fr';
import { en } from '@/lib/i18n/en';
import type { Locale, Translations } from '@/lib/i18n/types';

interface LocaleContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'fr',
  t: fr,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('locale') as Locale | null;
      if (stored === 'en') setLocaleState('en');
    } catch {
      // localStorage not available
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem('locale', l);
    } catch {
      // localStorage not available
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, t: locale === 'fr' ? fr : en, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
