"use client";

import { useState, type FormEvent } from "react";
import { countries, type CountryCode } from "@/lib/config";

type Interest = "femme" | "homme" | "sneakers";

const interestLabels: Record<Interest, string> = {
  femme: "Femme",
  homme: "Homme",
  sneakers: "Sneakers",
};

export function WaitlistForm({ defaultInterest = "homme" }: { defaultInterest?: Interest }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [country, setCountry] = useState<CountryCode>("FR");
  const [interest, setInterest] = useState<Interest>(defaultInterest);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, country, interest }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-sm text-muted">
        Merci {firstName || ""}, vous êtes inscrit·e à la liste d&apos;attente.
        Nous vous écrirons dès que la collection sera disponible.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-sm">
      <label className="block">
        <span className="text-xs tracking-label text-muted">Prénom</span>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 w-full bg-transparent border-b border-brown/30 py-2 text-sm outline-none focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="text-xs tracking-label text-muted">E-mail</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full bg-transparent border-b border-brown/30 py-2 text-sm outline-none focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="text-xs tracking-label text-muted">Pays</span>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value as CountryCode)}
          className="mt-1 w-full bg-transparent border-b border-brown/30 py-2 text-sm outline-none focus:border-accent"
        >
          {(Object.keys(countries) as CountryCode[]).map((c) => (
            <option key={c} value={c}>
              {countries[c].label}
            </option>
          ))}
        </select>
      </label>
      <fieldset>
        <legend className="text-xs tracking-label text-muted mb-2">Je suis intéressé·e par</legend>
        <div className="flex gap-2">
          {(Object.keys(interestLabels) as Interest[]).map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setInterest(i)}
              className={`text-xs px-3 py-2 border ${
                interest === i ? "border-ink text-ink" : "border-brown/25 text-muted"
              }`}
            >
              {interestLabels[i]}
            </button>
          ))}
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-ink text-cream py-3 text-xs tracking-label hover:bg-brown transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Envoi…" : "Rejoindre la liste d'attente"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-700">Une erreur est survenue, merci de réessayer.</p>
      )}
    </form>
  );
}
