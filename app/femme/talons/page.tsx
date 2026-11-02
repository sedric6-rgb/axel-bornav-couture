import type { Metadata } from "next";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByFamily } from "@/lib/products";

export const metadata: Metadata = { title: "Talons" };

export default function TalonsPage() {
  const products = getProductsByFamily("Talons");

  return (
    <div>
      <CategoryHero title="Talons" subtitle="Femme" image="/images/croisees.jpg" />
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
