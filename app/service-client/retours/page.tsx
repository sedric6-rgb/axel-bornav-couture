import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Retours et échanges" };

export default function RetoursPage() {
  return (
    <TextPage eyebrow="Service client" title="Retours et échanges">
      <p>
        Vous disposez de {siteConfig.returnDays} jours à compter de la
        réception de votre commande pour demander un échange (autre
        pointure, autre coloris).
      </p>

      <h2>Conditions</h2>
      <p>
        Les articles doivent être retournés non portés, dans leur coffret
        d&apos;origine avec le pochon et la carte de la Maison.
      </p>

      <h2>Comment procéder</h2>
      <p>
        Écrivez-nous à{" "}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>{" "}
        en indiquant votre numéro de commande. Nous vous enverrons une
        étiquette de retour prépayée.
      </p>

      <h2>Échange, pas de remboursement</h2>
      <p>
        Notre politique est l&apos;échange (pointure ou coloris) : nous ne
        proposons pas de remboursement, hors exercice de votre{" "}
        <Link href="/retractation">droit de rétractation</Link> légal de 14
        jours, auquel vous pouvez recourir conformément à la loi.
      </p>
    </TextPage>
  );
}
