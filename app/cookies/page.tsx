import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Cookies" };

export default function CookiesPage() {
  return (
    <TextPage eyebrow="Informations légales" title="Cookies" provisional>
      <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
      <p>
        Un cookie est un petit fichier déposé sur votre appareil lors de
        votre navigation, qui permet de mémoriser certaines informations.
      </p>

      <h2>Cookies essentiels</h2>
      <p>
        Ces cookies sont nécessaires au fonctionnement du site (panier,
        favoris, choix de pays et de devise) et ne peuvent pas être
        désactivés.
      </p>

      <h2>Cookies de mesure d&apos;audience</h2>
      <p>
        Avec votre accord uniquement, nous pouvons utiliser des cookies de
        mesure d&apos;audience pour comprendre l&apos;usage du site et l&apos;améliorer.
        Ils sont désactivés par défaut tant que vous n&apos;avez pas donné votre
        accord.
      </p>

      <h2>Gérer votre choix</h2>
      <p>
        Vous pouvez accepter ou refuser les cookies non essentiels via le
        bandeau affiché lors de votre première visite. Pour modifier votre
        choix, videz les données de ce site dans votre navigateur et
        rechargez la page.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question, écrivez-nous à{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </TextPage>
  );
}
