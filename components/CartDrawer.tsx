"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCountry } from "@/context/CountryContext";
import { countries } from "@/lib/config";
import { siteConfig } from "@/lib/config";

export function CartDrawer() {
  const { lines, isOpen, closeCart, removeLine, updateQuantity } = useCart();
  const { country } = useCountry();
  const c = countries[country];

  const total = lines.reduce((sum, l) => {
    const price = country === "FR" ? l.priceFR : l.priceUS;
    return sum + price * l.quantity;
  }, 0);

  const formattedTotal = new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency: c.currency,
    minimumFractionDigits: 0,
  }).format(total);

  return (
    <>
      <div
        className={`fixed inset-0 bg-ink/40 z-50 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Panier"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-brown/15">
          <h2 className="font-serif text-lg">Votre panier</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="text-2xl leading-none text-muted hover:text-ink"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="text-sm text-muted py-12 text-center">
              Votre panier est vide pour le moment.
            </p>
          ) : (
            <ul className="space-y-6">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  <div className="relative w-20 h-20 shrink-0 bg-ink/5">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink">{line.name}</p>
                    {line.variantLabel && (
                      <p className="text-xs text-muted">{line.variantLabel}</p>
                    )}
                    <p className="text-xs text-muted">Pointure {line.sizeEU}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        className="w-6 h-6 border border-brown/30 text-xs"
                        aria-label="Diminuer la quantité"
                      >
                        −
                      </button>
                      <span className="text-sm w-4 text-center">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        className="w-6 h-6 border border-brown/30 text-xs"
                        aria-label="Augmenter la quantité"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        className="text-xs text-muted underline ml-auto"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-brown/15 px-6 py-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span>Total</span>
              <span className="font-medium">{formattedTotal}</span>
            </div>
            <p className="text-xs text-muted">{siteConfig.shippingMessage}</p>
            <Link
              href="/panier"
              onClick={closeCart}
              className="block w-full text-center bg-ink text-cream py-3 text-sm tracking-label hover:bg-brown transition-colors"
            >
              {siteConfig.preorderEnabled ? "Précommander" : "Passer commande"}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
