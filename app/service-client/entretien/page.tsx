import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";

export const metadata: Metadata = { title: "Entretien" };

export default function EntretienPage() {
  return (
    <TextPage eyebrow="Service client" title="Entretien">
      <p>
        Nos modèles sont réalisés en cuir pleine fleur. Un entretien simple et
        régulier leur assure une belle tenue dans le temps.
      </p>

      <h2>Au quotidien</h2>
      <p>
        Essuyez le cuir avec un chiffon doux et sec après chaque usage.
        Laissez vos chaussures respirer entre deux ports.
      </p>

      <h2>À éviter</h2>
      <p>
        L&apos;exposition prolongée au soleil, la pluie et l&apos;humidité, qui
        peuvent ternir ou déformer le cuir.
      </p>

      <h2>Réparation</h2>
      <p>
        Chaque paire {`Axel Bornav Couture`} bénéficie d&apos;une garantie de
        réparation. Contactez notre{" "}
        <a href="/service-client/contact">service client</a> pour toute
        demande.
      </p>
    </TextPage>
  );
}
