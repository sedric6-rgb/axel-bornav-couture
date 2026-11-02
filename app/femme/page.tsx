import type { Metadata } from "next";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByGender } from "@/lib/products";

export const metadata: Metadata = { title: "Femme" };

export default function FemmePage() {
  const products = getProductsByGender("femme");

  return (
    <div>
      <CategoryHero
        title="Femme"
        subtitle="Collection"
        image="/images/gamme.jpg"
      />
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
