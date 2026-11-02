import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <TextPage eyebrow="Informations légales" title="Politique de confidentialité" provisional>
      <h2>Responsable de traitement</h2>
      <p>
        {siteConfig.brandName}, contactable à{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>,
        est responsable du traitement des données collectées sur ce site.
      </p>

      <h2>Données collectées</h2>
      <p>
        Nous collectons les données que vous nous transmettez directement :
        e-mail, prénom, nom, adresse postale, pays, pointure et préférences,
        dans le cadre d&apos;une inscription à la liste d&apos;attente, d&apos;une
        précommande ou d&apos;un contact.
      </p>

      <h2>Finalités</h2>
      <p>
        Gestion des précommandes, envoi d&apos;e-mails liés à votre commande,
        envoi de notre newsletter (si vous y avez consenti), réponse à vos
        demandes de contact.
      </p>

      <h2>Base légale</h2>
      <p>
        Exécution d&apos;une démarche précontractuelle ou contractuelle, et
        consentement pour la newsletter.
      </p>

      <h2>Destinataires</h2>
      <p>
        Vos données sont traitées par {siteConfig.brandName} et par nos
        prestataires techniques (hébergement, gestion de la liste d&apos;attente
        et de la newsletter, paiement), dans la stricte mesure nécessaire à
        leurs services.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Vos données sont conservées pendant la durée nécessaire aux
        finalités ci-dessus, puis archivées ou supprimées conformément aux
        obligations légales.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
        rectification, d&apos;effacement, d&apos;opposition et de portabilité de vos
        données. Pour les exercer, écrivez-nous à{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        Voir notre <Link href="/cookies">politique de cookies</Link>.
      </p>
    </TextPage>
  );
}
