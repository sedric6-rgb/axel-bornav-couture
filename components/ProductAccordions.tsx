import type { Product } from "@/lib/types";
import { siteConfig } from "@/lib/config";

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-brown/15 py-5">
      <summary className="flex items-center justify-between cursor-pointer list-none text-sm text-ink">
        {title}
        <span className="text-muted group-open:rotate-45 transition-transform">+</span>
      </summary>
      <div className="pt-4 text-sm text-muted leading-relaxed">{children}</div>
    </details>
  );
}

export function ProductAccordions({ product }: { product: Product }) {
  return (
    <div className="mt-4">
      <AccordionItem title="Description">
        <p>{product.description}</p>
      </AccordionItem>
      <AccordionItem title="Matières et entretien">
        <p>{product.materials}</p>
        <p className="mt-2">{product.care}</p>
      </AccordionItem>
      <AccordionItem title="Livraison et retours">
        <p>{siteConfig.shippingMessage}</p>
        <p className="mt-2">
          Retours et échanges possibles sous {siteConfig.returnDays} jours. Voir notre{" "}
          <a href="/service-client/retours" className="underline">
            politique de retours
          </a>
          .
        </p>
      </AccordionItem>
      <AccordionItem title="Guide des pointures">
        <p>
          Pointures européennes 35 à 46. Consultez notre{" "}
          <a href="/service-client/pointures" className="underline">
            tableau de conversion complet
          </a>{" "}
          (France / États-Unis).
        </p>
      </AccordionItem>
    </div>
  );
}
