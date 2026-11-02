"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useCountry } from "@/context/CountryContext";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/config";
import { WishlistHeart } from "./WishlistHeart";

export function ProductOptions({ product }: { product: Product }) {
  const { addLine } = useCart();
  const { country } = useCountry();
  const [sole, setSole] = useState(product.soleColors?.[0] ?? "");
  const [strap, setStrap] = useState(product.strapColors?.[0] ?? "");
  const [colorway, setColorway] = useState(product.colorways?.[0] ?? "");
  const [sizeEU, setSizeEU] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const hasSoleStrap = Boolean(product.soleColors && product.strapColors);
  const hasColorways = Boolean(product.colorways);

  function variantLabel() {
    if (hasSoleStrap) return `Semelle ${sole} · Lanière ${strap}`;
    if (hasColorways) return colorway;
    return undefined;
  }

  function handleAdd() {
    if (!sizeEU) {
      setSizeError(true);
      return;
    }
    const label = variantLabel();
    addLine({
      id: `${product.slug}__${label ?? ""}__${sizeEU}`,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      variantLabel: label,
      sizeEU,
      priceFR: product.priceFR,
      priceUS: product.priceUS,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      <p className="text-xs tracking-label text-muted mb-2">{product.family}</p>
      <h1 className="font-serif text-3xl md:text-4xl mb-3">{product.name}</h1>
      <p className="text-lg mb-6">{formatPrice(product, country)}</p>
      <p className="text-sm text-muted leading-relaxed mb-8">{product.shortDescription}</p>

      {hasSoleStrap && (
        <div className="mb-6">
          <p className="text-xs tracking-label text-muted mb-3">Semelle — {sole}</p>
          <div className="flex flex-wrap gap-2">
            {product.soleColors!.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSole(c)}
                className={`text-xs px-3 py-2 border ${
                  sole === c ? "border-ink text-ink" : "border-brown/25 text-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="text-xs tracking-label text-muted mb-3 mt-5">Lanière — {strap}</p>
          <div className="flex flex-wrap gap-2">
            {product.strapColors!.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setStrap(c)}
                className={`text-xs px-3 py-2 border ${
                  strap === c ? "border-ink text-ink" : "border-brown/25 text-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasColorways && (
        <div className="mb-6">
          <p className="text-xs tracking-label text-muted mb-3">Coloris — {colorway}</p>
          <div className="flex flex-wrap gap-2">
            {product.colorways!.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColorway(c)}
                className={`text-xs px-3 py-2 border ${
                  colorway === c ? "border-ink text-ink" : "border-brown/25 text-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-3">
          <p className="text-xs tracking-label text-muted">
            Pointure {sizeEU ? `— ${sizeEU}` : ""}
          </p>
          <a href="/service-client/pointures" className="text-xs text-muted underline">
            Guide des pointures
          </a>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {product.sizesEU.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSizeEU(s);
                setSizeError(false);
              }}
              className={`text-sm py-2 border ${
                sizeEU === s ? "border-ink text-ink" : "border-brown/25 text-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {sizeError && (
          <p className="text-xs text-red-700 mt-2">Merci de choisir une pointure.</p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 bg-ink text-cream py-4 text-xs tracking-label hover:bg-brown transition-colors"
        >
          {added
            ? "Ajouté au panier"
            : siteConfig.preorderEnabled
              ? "Précommander"
              : "Ajouter au panier"}
        </button>
        <div className="flex items-center justify-center w-14 border border-brown/25">
          <WishlistHeart slug={product.slug} />
        </div>
      </div>

      {siteConfig.preorderEnabled && (
        <p className="text-xs text-muted mt-4">{siteConfig.preorderMessage}</p>
      )}
      <p className="text-xs text-muted mt-2">{siteConfig.shippingMessage}</p>
    </div>
  );
}
