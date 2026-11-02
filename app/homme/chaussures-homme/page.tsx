import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Chaussures homme" };

export default function ChaussuresHommePage() {
  return (
    <ComingSoon
      title="Chaussures homme"
      description="Tongs et autres modèles pour homme, dans le même esprit couture que la collection Femme. Premières pièces à venir."
      image="/images/boucle.jpg"
      interest="homme"
    />
  );
}
