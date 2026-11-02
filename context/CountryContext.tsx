"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type CountryCode } from "@/lib/config";

interface CountryContextValue {
  country: CountryCode;
  setCountry: (c: CountryCode) => void;
}

const CountryContext = createContext<CountryContextValue | null>(null);

const STORAGE_KEY = "abc-country";

function detectCountry(): CountryCode {
  if (typeof navigator === "undefined") return "FR";
  const langs = navigator.languages ?? [navigator.language];
  const isUS = langs.some((l) => l.toLowerCase().includes("us"));
  return isUS ? "US" : "FR";
}

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<CountryCode>("FR");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as CountryCode | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate the real value from localStorage once mounted; SSR/first paint safely uses the "FR" default above
      setCountryState(stored ?? detectCountry());
    } catch {
      setCountryState(detectCountry());
    }
  }, []);

  function setCountry(c: CountryCode) {
    setCountryState(c);
    try {
      window.localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // stockage indisponible : on garde la valeur en mémoire seulement
    }
  }

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry doit être utilisé dans CountryProvider");
  return ctx;
}
