import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Mon compte" };

export default function ComptePage() {
  return (
    <TextPage eyebrow="Votre espace" title="Mon compte">
      <p>
        L&apos;espace client arrive avec l&apos;ouverture officielle des ventes, en{" "}
        {siteConfig.launchDate}. Vous pourrez y suivre vos précommandes et
        retrouver vos informations.
      </p>
      <p>
        En attendant, pour toute question sur une précommande, écrivez-nous à{" "}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
      </p>
    </TextPage>
  );
}
