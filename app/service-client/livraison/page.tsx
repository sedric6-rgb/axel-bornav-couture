import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Livraison et douane" };

export default function LivraisonPage() {
  return (
    <TextPage eyebrow="Service client" title="Livraison et douane">
      <p>
        {siteConfig.brandName} livre directement en France et aux États-Unis.
        Les droits de douane et taxes d&apos;importation sont inclus dans le prix
        affiché : vous ne payez rien de plus à la réception.
      </p>

      <h2>France</h2>
      <p>Prix affichés en euros, TVA 20 % incluse, livraison et droits inclus.</p>

      <h2>États-Unis</h2>
      <p>
        Prix affichés en dollars avant taxe de vente locale, qui s&apos;ajoute au
        moment du paiement selon l&apos;État de livraison. Droits de douane inclus.
      </p>

      <h2>Délais pendant la précommande</h2>
      <p>
        Le premier lot étant numéroté et fabriqué sur commande, comptez{" "}
        {siteConfig.preorderMessage.toLowerCase()} Vous recevrez un e-mail de
        confirmation avec un numéro de suivi dès l&apos;expédition.
      </p>
    </TextPage>
  );
}
