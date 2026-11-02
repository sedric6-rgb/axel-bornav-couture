"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { useCountry } from "@/context/CountryContext";
import { getProductColors } from "@/lib/productUtils";
import { ProductCard } from "./ProductCard";

type SortKey = "suggestions" | "prix-asc" | "prix-desc" | "nom";

export function ProductGrid({ products }: { products: Product[] }) {
  const { country } = useCountry();
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("suggestions");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => getProductColors(p).forEach((c) => set.add(c)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "fr"));
  }, [products]);

  const allSizes = useMemo(() => {
    const set = new Set<number>();
    products.forEach((p) => p.sizesEU.forEach((s) => set.add(s)));
    return Array.from(set).sort((a, b) => a - b);
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (color && !getProductColors(p).includes(color)) return false;
      if (size && !p.sizesEU.includes(Number(size))) return false;
      return true;
    });

    const price = (p: Product) => (country === "FR" ? p.priceFR : p.priceUS);
    if (sort === "prix-asc") list = [...list].sort((a, b) => price(a) - price(b));
    if (sort === "prix-desc") list = [...list].sort((a, b) => price(b) - price(a));
    if (sort === "nom") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "fr"));

    return list;
  }, [products, color, size, sort, country]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 border-b border-brown/15 pb-4">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          className="text-xs tracking-label text-ink hover:text-accent transition-colors"
        >
          Filtres {filtersOpen ? "−" : "+"}
        </button>
        <p className="text-xs text-muted">{filtered.length} modèle{filtered.length > 1 ? "s" : ""}</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="text-xs tracking-label bg-transparent border-none outline-none text-right cursor-pointer"
        >
          <option value="suggestions">Trier : suggestions</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="nom">Nom A→Z</option>
        </select>
      </div>

      {filtersOpen && (
        <div className="flex flex-wrap gap-8 mb-10 pb-8 border-b border-brown/15">
          <div>
            <p className="text-xs tracking-label text-muted mb-3">Couleur</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setColor("")}
                className={`text-xs px-3 py-1.5 border ${
                  color === "" ? "border-ink text-ink" : "border-brown/25 text-muted"
                }`}
              >
                Toutes
              </button>
              {allColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`text-xs px-3 py-1.5 border ${
                    color === c ? "border-ink text-ink" : "border-brown/25 text-muted"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-label text-muted mb-3">Pointure</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSize("")}
                className={`text-xs px-3 py-1.5 border ${
                  size === "" ? "border-ink text-ink" : "border-brown/25 text-muted"
                }`}
              >
                Toutes
              </button>
              {allSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(String(s))}
                  className={`text-xs px-3 py-1.5 border ${
                    size === String(s) ? "border-ink text-ink" : "border-brown/25 text-muted"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm text-muted py-16 text-center">
          Aucun modèle ne correspond à ces filtres.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
