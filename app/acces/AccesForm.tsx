"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

export function AccesForm() {
  const [from, setFrom] = useState("/");
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the redirect target/error from the URL once mounted; SSR/first paint safely uses the defaults above
    setFrom(params.get("from") || "/");
    setError(params.get("error") === "1");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm text-center">
        <p className="font-serif text-2xl tracking-[0.18em] mb-1">AXEL BORNAV</p>
        <p className="text-[0.6rem] tracking-[0.4em] text-muted mb-10">COUTURE</p>
        <p className="text-sm text-muted mb-8">
          Site en cours de préparation. Entrez le mot de passe d&apos;accès
          pour continuer.
        </p>
        <form method="POST" action="/api/acces" className="space-y-5">
          <input type="hidden" name="from" value={from} />
          <input
            type="password"
            name="password"
            autoFocus
            required
            placeholder="Mot de passe"
            className="w-full bg-transparent border-b border-brown/30 py-3 text-sm text-center outline-none focus:border-accent"
          />
          {error && (
            <p className="text-xs text-red-700">Mot de passe incorrect.</p>
          )}
          <button
            type="submit"
            className="w-full bg-ink text-cream py-3 text-xs tracking-label hover:bg-brown transition-colors"
          >
            Entrer
          </button>
        </form>
        <p className="text-xs text-muted mt-10">{siteConfig.brandName}</p>
      </div>
    </div>
  );
}
