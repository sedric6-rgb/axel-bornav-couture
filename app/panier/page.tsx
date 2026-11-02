"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCountry } from "@/context/CountryContext";
import { countries } from "@/lib/config";
import { siteConfig } from "@/lib/config";

export default function PanierPage() {
  const { lines, updateQuantity, removeLine } = useCart();
  const { country } = useCountry();
  const c = countries[country];

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const total = lines.reduce((sum, l) => {
    const price = country === "FR" ? l.priceFR : l.priceUS;
    return sum + price * l.quantity;
  }, 0);

  const formattedTotal = new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency: c.currency,
    minimumFractionDigits: 0,
  }).format(total);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          country,
          items: lines.map((l) => ({
            slug: l.slug,
            name: l.name,
            variantLabel: l.variantLabel,
            sizeEU: l.sizeEU,
            quantity: l.quantity,
          })),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Merci pour votre précommande</h1>
        <p className="text-sm text-muted leading-relaxed">
          Votre demande a bien été enregistrée. Nous vous recontacterons par
          e-mail pour confirmer votre précommande du premier lot numéroté.
          {" "}{siteConfig.preorderMessage}
        </p>
        <Link href="/" className="inline-block mt-8 text-xs tracking-label border-b border-ink pb-1">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Votre panier est vide</h1>
        <Link href="/femme" className="inline-block mt-4 text-xs tracking-label border-b border-ink pb-1">
          Découvrir la collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-16">
      <div>
        <h1 className="font-serif text-3xl mb-8">
          {siteConfig.preorderEnabled ? "Précommande" : "Paiement"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Prénom" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} required />
            <Field label="Nom" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} required />
          </div>
          <Field label="E-mail" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
          <Field label="Adresse" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Ville" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
            <Field label="Code postal" value={form.postalCode} onChange={(v) => setForm({ ...form, postalCode: v })} required />
          </div>
          <p className="text-xs text-muted">
            Pays de livraison : <strong>{c.label}</strong> ({c.currency}). Modifiable
            via le sélecteur en haut de page.
          </p>

          <div className="bg-ink/5 border border-brown/15 p-4 text-xs text-muted leading-relaxed">
            Le paiement en ligne (carte, Apple Pay, Google Pay) sera activé
            après confirmation des devis usine. Pour l&apos;instant, cette demande
            réserve votre place sur le premier lot numéroté — aucun paiement
            n&apos;est débité aujourd&apos;hui.
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-ink text-cream py-4 text-xs tracking-label hover:bg-brown transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Envoi…" : "Réserver ma précommande"}
          </button>
          {status === "error" && (
            <p className="text-xs text-red-700">Une erreur est survenue, merci de réessayer.</p>
          )}
        </form>
      </div>

      <div>
        <p className="text-xs tracking-label text-muted mb-5">Récapitulatif</p>
        <ul className="space-y-5 mb-6">
          {lines.map((line) => (
            <li key={line.id} className="flex gap-4">
              <div className="relative w-16 h-16 shrink-0 bg-ink/5">
                <Image src={line.image} alt={line.name} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{line.name}</p>
                {line.variantLabel && <p className="text-xs text-muted">{line.variantLabel}</p>}
                <p className="text-xs text-muted">Pointure {line.sizeEU}</p>
                <div className="flex items-center gap-3 mt-1">
                  <button type="button" onClick={() => updateQuantity(line.id, line.quantity - 1)} className="w-5 h-5 border border-brown/30 text-xs">−</button>
                  <span className="text-xs w-4 text-center">{line.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(line.id, line.quantity + 1)} className="w-5 h-5 border border-brown/30 text-xs">+</button>
                  <button type="button" onClick={() => removeLine(line.id)} className="text-xs text-muted underline ml-auto">Retirer</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between text-sm border-t border-brown/15 pt-4">
          <span>Total</span>
          <span className="font-medium">{formattedTotal}</span>
        </div>
        <p className="text-xs text-muted mt-2">{siteConfig.shippingMessage}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs tracking-label text-muted">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-transparent border-b border-brown/30 py-2 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}
