"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "abc-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage once mounted; SSR/first paint safely stays hidden until then
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: "accepted" | "refused") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // stockage indisponible
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-3 py-2 md:px-6 md:py-5 flex flex-row flex-wrap md:flex-nowrap items-center gap-2 md:gap-8">
        <p className="text-[0.65rem] leading-tight md:text-sm text-cream/85 flex-1 min-w-[140px]">
          <span className="md:hidden">Cookies —</span>
          <span className="hidden md:inline">
            Cookies essentiels au site et, avec votre accord, de mesure d&apos;audience.
          </span>{" "}
          <Link href="/cookies" className="underline hover:text-gold whitespace-nowrap">
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-2 md:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => choose("refused")}
            className="text-[0.65rem] md:text-xs tracking-label border border-cream/40 px-3 py-1 md:px-4 md:py-2 hover:border-cream transition-colors"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="text-[0.65rem] md:text-xs tracking-label bg-gold text-ink px-3 py-1 md:px-4 md:py-2 hover:bg-cream transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
