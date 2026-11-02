import type { Metadata } from "next";
import Link from "next/link";
import { footerColumns } from "@/lib/navigation";

export const metadata: Metadata = { title: "Service client" };

const links = footerColumns.find((c) => c.heading === "Service client")!.links;

const descriptions: Record<string, string> = {
  "/service-client/livraison": "Délais, douane et zones de livraison.",
  "/service-client/retours": "Comment retourner ou échanger un modèle.",
  "/service-client/pointures": "Tableau de conversion France / États-Unis.",
  "/service-client/entretien": "Conseils pour préserver le cuir.",
  "/service-client/faq": "Les questions les plus fréquentes.",
  "/service-client/contact": "Nous écrire.",
};

export default function ServiceClientPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <p className="text-xs tracking-label text-muted mb-4">Service client</p>
      <h1 className="font-serif text-3xl md:text-4xl mb-12">Nous sommes à votre écoute</h1>
      <ul className="divide-y divide-brown/15 border-t border-b border-brown/15">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="flex items-center justify-between py-5 group">
              <div>
                <p className="text-sm text-ink group-hover:text-accent transition-colors">
                  {link.label}
                </p>
                <p className="text-xs text-muted mt-1">{descriptions[link.href]}</p>
              </div>
              <span className="text-muted group-hover:text-accent transition-colors">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
