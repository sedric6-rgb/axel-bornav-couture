import type { Metadata } from "next";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByGender } from "@/lib/products";

export const metadata: Metadata = { title: "Homme" };

export default function HommePage() {
  const products = getProductsByGender("homme");

  return (
    <div>
      <CategoryHero
        title="Homme"
        subtitle="Collection"
        image="/images/homme-gamme-richelieu.jpg"
      />
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
