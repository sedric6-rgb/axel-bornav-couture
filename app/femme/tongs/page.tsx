import type { Metadata } from "next";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByFamily } from "@/lib/products";

export const metadata: Metadata = { title: "Tongs" };

export default function TongsPage() {
  const products = getProductsByFamily("Tongs");

  return (
    <div>
      <CategoryHero title="Tongs" subtitle="Femme" image="/images/cravate2.jpg" />
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
