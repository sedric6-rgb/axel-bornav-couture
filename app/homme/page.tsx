import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Homme" };

export default function HommePage() {
  return (
    <ComingSoon
      title="Homme"
      description="La collection Homme Axel Bornav Couture arrive bientôt : chaussures et sneakers, toujours dans l'esprit de la chemise sur mesure. Inscrivez-vous pour être informé·e en priorité."
      image="/images/cravate2.jpg"
      interest="homme"
    />
  );
}
