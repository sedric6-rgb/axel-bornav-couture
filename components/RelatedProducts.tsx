import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 border-t border-brown/15">
      <p className="text-xs tracking-label text-muted mb-8">Vous aimerez aussi</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
