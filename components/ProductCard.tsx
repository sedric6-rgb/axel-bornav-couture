"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useCountry } from "@/context/CountryContext";
import { formatPrice } from "@/lib/format";
import { WishlistHeart } from "./WishlistHeart";
import { siteConfig } from "@/lib/config";

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { country } = useCountry();
  const secondImage = product.images[1];

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square bg-ink/5 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${
            hovered && secondImage ? "opacity-0" : "opacity-100"
          }`}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
        {secondImage && (
          <Image
            src={secondImage}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        )}
        <WishlistHeart slug={product.slug} className="absolute top-3 right-3" />
        {product.status === "precommande" && siteConfig.preorderEnabled && (
          <span className="absolute top-3 left-3 bg-cream/90 text-[0.65rem] tracking-label px-2 py-1">
            Précommande
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <p className="text-sm text-ink">{product.name}</p>
        <p className="text-sm text-muted">{formatPrice(product, country)}</p>
      </div>
    </Link>
  );
}
