import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <TextPage eyebrow="Informations légales" title="Mentions légales" provisional>
      <h2>Éditeur du site</h2>
      <p>
        {siteConfig.brandName}
        <br />
        [Forme juridique à compléter — ex. SAS au capital de ... €]
        <br />
        Siège social : [adresse à compléter]
        <br />
        RCS / SIRET : [à compléter]
        <br />
        N° de TVA intracommunautaire : [à compléter]
        <br />
        Directeur de la publication : [nom à compléter]
        <br />
        Contact : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina,
        CA 91723, États-Unis — vercel.com.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments de ce site (textes, photographies, logos,
        charte graphique) est la propriété de {siteConfig.brandName}, sauf
        mention contraire, et ne peut être reproduit sans autorisation
        préalable.
      </p>

      <h2>Responsabilité</h2>
      <p>
        {siteConfig.brandName} s&apos;efforce d&apos;assurer l&apos;exactitude des
        informations diffusées sur ce site, mais ne saurait être tenue
        responsable des erreurs ou omissions.
      </p>
    </TextPage>
  );
}
