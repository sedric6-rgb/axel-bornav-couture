"use client";

import { useState, type FormEvent } from "react";
import { useCountry } from "@/context/CountryContext";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const { country } = useCountry();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, country, interest: "general" }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className={compact ? "text-xs text-muted" : "text-sm text-muted"}>
        Merci, votre inscription est enregistrée.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre e-mail"
        className="flex-1 bg-transparent border-b border-brown/30 py-2 text-sm placeholder:text-muted/60 outline-none focus:border-accent"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="text-xs tracking-label border-b border-ink pb-2 hover:text-accent hover:border-accent transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "…" : "S'inscrire"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-700 absolute mt-10">Une erreur est survenue.</p>
      )}
    </form>
  );
}
