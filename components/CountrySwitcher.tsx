"use client";

import { useState, useRef, useEffect } from "react";
import { countries, type CountryCode } from "@/lib/config";
import { useCountry } from "@/context/CountryContext";

export function CountrySwitcher() {
  const { country, setCountry } = useCountry();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-xs tracking-label text-ink hover:text-accent transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {country} · {countries[country].currencySymbol}
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-44 bg-cream border border-brown/15 shadow-lg z-50">
          {(Object.keys(countries) as CountryCode[]).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setCountry(code);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-ink/5 transition-colors ${
                code === country ? "text-accent" : "text-ink"
              }`}
            >
              {countries[code].label} — {countries[code].currency}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
