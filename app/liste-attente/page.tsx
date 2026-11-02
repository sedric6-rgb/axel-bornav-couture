import type { Metadata } from "next";
import { WaitlistForm } from "@/components/WaitlistForm";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Liste d'attente" };

export default function ListeAttentePage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <p className="text-xs tracking-label text-muted mb-4">Précommande</p>
      <h1 className="font-serif text-3xl md:text-4xl mb-6">Liste d&apos;attente</h1>
      <p className="text-sm text-muted leading-relaxed mb-10">
        Le premier lot numéroté d&apos;{siteConfig.brandName} ouvre ses ventes en{" "}
        {siteConfig.launchDate}. Inscrivez-vous pour être informé·e en priorité
        du lancement, de la Femme à la future collection Homme.
      </p>
      <WaitlistForm defaultInterest="femme" />
    </div>
  );
}
