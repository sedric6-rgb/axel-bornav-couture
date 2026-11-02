import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Conditions générales de vente" };

export default function CgvPage() {
  return (
    <TextPage eyebrow="Informations légales" title="Conditions générales de vente" provisional>
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions générales de vente régissent les ventes de
        produits {siteConfig.brandName} réalisées sur ce site, à destination
        de clients situés en France et aux États-Unis.
      </p>

      <h2>2. Précommande et premier lot</h2>
      <p>
        Les produits sont actuellement proposés en précommande, dans le cadre
        d&apos;un premier lot numéroté. L&apos;ouverture officielle des ventes est
        prévue en {siteConfig.launchDate}. {siteConfig.preorderMessage}
      </p>

      <h2>3. Prix</h2>
      <p>
        Les prix sont indiqués en euros TTC (TVA 20 % incluse) pour la
        France, et en dollars américains avant taxe de vente locale pour les
        États-Unis. La livraison et les droits de douane sont inclus dans le
        prix affiché.
      </p>

      <h2>4. Commande et paiement</h2>
      <p>
        Toute commande suppose l&apos;acceptation des présentes conditions. Le
        paiement en ligne sera sécurisé via Stripe (carte bancaire, Apple
        Pay, Google Pay).
      </p>

      <h2>5. Livraison</h2>
      <p>
        Voir notre page <Link href="/service-client/livraison">Livraison et douane</Link>.
      </p>

      <h2>6. Droit de rétractation</h2>
      <p>
        Voir notre page <Link href="/retractation">Droit de rétractation</Link>.
      </p>

      <h2>7. Garanties</h2>
      <p>
        Chaque paire bénéficie d&apos;une garantie de réparation. Voir notre
        page <Link href="/service-client/entretien">Entretien</Link>.
      </p>

      <h2>8. Droit applicable</h2>
      <p>
        Les présentes conditions sont soumises au droit français pour les
        clients livrés en France, sans préjudice des dispositions impératives
        applicables aux clients livrés aux États-Unis.
      </p>
    </TextPage>
  );
}
