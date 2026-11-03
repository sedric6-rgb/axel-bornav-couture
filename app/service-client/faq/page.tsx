import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  {
    q: "Quand vais-je recevoir ma précommande ?",
    a: `Le premier lot numéroté est fabriqué sur commande. ${siteConfig.preorderMessage} L'ouverture officielle des ventes est prévue en ${siteConfig.launchDate}.`,
  },
  {
    q: "La livraison et les droits de douane sont-ils vraiment inclus ?",
    a: "Oui. Le prix affiché en France et aux États-Unis inclut la livraison et les droits de douane. Seule la taxe de vente locale américaine s'ajoute au paiement.",
  },
  {
    q: "Quelles pointures proposez-vous ?",
    a: "Du 35 au 46 en pointures européennes, avec un tableau de conversion américain disponible dans notre guide des pointures.",
  },
  {
    q: "Puis-je faire broder mes initiales ?",
    a: "Oui, la broderie d'initiales est proposée sur demande. Contactez notre service client avant votre commande.",
  },
  {
    q: "Que contient le coffret ?",
    a: "Chaque paire est livrée dans une boîte rigide noire siglée, avec papier de soie monogrammé, pochon en satin noir et carte de la Maison.",
  },
  {
    q: "Puis-je retourner un modèle ?",
    a: `Nous proposons l'échange (pointure ou coloris) sous ${siteConfig.returnDays} jours après réception, mais pas de remboursement — hors exercice de votre droit de rétractation légal de 14 jours. Voir notre page Retours et échanges.`,
  },
];

export default function FaqPage() {
  return (
    <TextPage eyebrow="Service client" title="Questions fréquentes">
      <div className="divide-y divide-brown/15">
        {faqs.map((f) => (
          <details key={f.q} className="py-5 group">
            <summary className="flex items-center justify-between cursor-pointer list-none text-sm text-ink">
              {f.q}
              <span className="text-muted group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="pt-3 text-sm text-muted leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </TextPage>
  );
}
