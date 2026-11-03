import type { Metadata } from "next";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByFamily } from "@/lib/products";

export const metadata: Metadata = { title: "Sneakers" };

export default function SneakersPage() {
  const products = getProductsByFamily("Sneakers");

  return (
    <div>
      <CategoryHero title="Sneakers" subtitle="Homme" image="/images/homme-sneaker.jpg" />
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
