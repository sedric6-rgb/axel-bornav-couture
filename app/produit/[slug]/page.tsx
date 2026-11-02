import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getProductsByFamily } from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductOptions } from "@/components/ProductOptions";
import { ProductAccordions } from "@/components/ProductAccordions";
import { RelatedProducts } from "@/components/RelatedProducts";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProductsByFamily(product.family)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { "@type": "Brand", name: "Axel Bornav Couture" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.priceFR,
      availability: "https://schema.org/PreOrder",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <ProductGallery images={product.images} name={product.name} />
        <div className="md:max-w-md">
          <ProductOptions product={product} />
          <ProductAccordions product={product} />
        </div>
      </div>
      <RelatedProducts products={related} />
    </div>
  );
}
