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
      <div className="mx-auto max-w-[1400px] px-6 py-5 flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <p className="text-xs md:text-sm text-cream/85 flex-1">
          Nous utilisons des cookies essentiels au fonctionnement du site. Avec
          votre accord, nous utilisons aussi des cookies de mesure d&apos;audience.
          Vous pouvez les refuser sans que cela affecte votre navigation.{" "}
          <Link href="/cookies" className="underline hover:text-gold">
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => choose("refused")}
            className="text-xs tracking-label border border-cream/40 px-4 py-2 hover:border-cream transition-colors"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="text-xs tracking-label bg-gold text-ink px-4 py-2 hover:bg-cream transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
