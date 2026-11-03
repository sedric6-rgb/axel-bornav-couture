import type { Metadata } from "next";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByFamily } from "@/lib/products";

export const metadata: Metadata = { title: "Chaussures homme" };

export default function ChaussuresHommePage() {
  const products = getProductsByFamily("Chaussures homme");

  return (
    <div>
      <CategoryHero title="Chaussures homme" subtitle="Homme" image="/images/homme-gamme-mocassin.jpg" />
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
