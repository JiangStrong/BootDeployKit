"use client";

import { messages } from "@/lib/i18n";
import type { Locale, MessageKey } from "@/lib/i18n";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("bootdeploykit-locale") as Locale | null;
    if (saved && saved in messages) {
      setLocaleState(saved);
    }
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    function setLocale(nextLocale: Locale) {
      setLocaleState(nextLocale);
      window.localStorage.setItem("bootdeploykit-locale", nextLocale);
      document.documentElement.lang = nextLocale;
    }

    return {
      locale,
      setLocale,
      t: (key) => messages[locale][key] ?? messages.en[key]
    };
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useI18n must be used inside LanguageProvider");
  }
  return context;
}
