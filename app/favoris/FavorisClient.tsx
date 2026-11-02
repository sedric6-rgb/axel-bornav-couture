"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";

export function FavorisClient({ allProducts }: { allProducts: Product[] }) {
  const { items } = useWishlist();
  const saved = allProducts.filter((p) => items.includes(p.slug));

  if (saved.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Vos favoris</h1>
        <p className="text-sm text-muted leading-relaxed mb-8">
          Vous n&apos;avez pas encore ajouté de modèle à vos favoris. Cliquez
          sur le cœur d&apos;un produit pour le retrouver ici.
        </p>
        <Link href="/femme" className="inline-block text-xs tracking-label border-b border-ink pb-1">
          Découvrir la collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16">
      <h1 className="font-serif text-3xl mb-10">Vos favoris</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
        {saved.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
