import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Droit de rétractation" };

export default function RetractationPage() {
  return (
    <TextPage eyebrow="Informations légales" title="Droit de rétractation" provisional>
      <p>
        Conformément à l&apos;article L221-18 du Code de la consommation, vous
        disposez d&apos;un délai de {siteConfig.returnDays} jours à compter de la
        réception de votre commande pour exercer votre droit de rétractation,
        sans avoir à justifier de motif.
      </p>

      <h2>Comment exercer ce droit</h2>
      <p>
        Écrivez-nous à{" "}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>{" "}
        en indiquant votre numéro de commande, ou utilisez le formulaire type
        ci-dessous.
      </p>

      <h2>Formulaire type de rétractation</h2>
      <p>
        « Je notifie par la présente ma rétractation du contrat portant sur
        la commande ci-dessous. Commandée le [date], reçue le [date]. Nom du
        client, adresse du client, signature (si envoi papier), date. »
      </p>

      <h2>Effets de la rétractation</h2>
      <p>
        Nous vous rembourserons l&apos;intégralité des sommes versées, livraison
        initiale comprise, dans un délai de 14 jours suivant la réception de
        l&apos;article retourné, selon le moyen de paiement utilisé.
      </p>

      <h2>État de l&apos;article</h2>
      <p>
        L&apos;article doit être retourné non porté, dans son coffret d&apos;origine
        avec l&apos;ensemble de ses accessoires.
      </p>
    </TextPage>
  );
}
