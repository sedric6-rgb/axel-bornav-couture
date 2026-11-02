"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export interface SearchIndexItem {
  slug: string;
  name: string;
  family: string;
  shortDescription: string;
}

export function SearchOverlay({
  items,
  open,
  onClose,
}: {
  items: SearchIndexItem[];
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.family.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q)
    );
  }, [items, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-cream z-50 flex flex-col">
      <div className="flex items-center gap-4 px-6 py-5 border-b border-brown/15">
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un modèle…"
          className="flex-1 bg-transparent font-serif text-xl md:text-2xl outline-none placeholder:text-muted/60"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la recherche"
          className="text-2xl leading-none text-muted hover:text-ink"
        >
          ×
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-2xl mx-auto w-full">
        {query.trim() === "" && (
          <p className="text-sm text-muted">
            Essayez « tongs », « escarpin », « boucle »…
          </p>
        )}
        {query.trim() !== "" && results.length === 0 && (
          <p className="text-sm text-muted">Aucun résultat pour « {query} ».</p>
        )}
        <ul className="space-y-4">
          {results.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/produit/${item.slug}`}
                onClick={onClose}
                className="block py-3 border-b border-brown/10 hover:text-accent transition-colors"
              >
                <p className="text-sm">{item.name}</p>
                <p className="text-xs text-muted">{item.family}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
