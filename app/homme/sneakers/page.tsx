import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Sneakers" };

export default function SneakersPage() {
  return (
    <ComingSoon
      title="Sneakers"
      description="Une collection de sneakers Axel Bornav Couture est en préparation. Inscrivez-vous pour être averti·e dès les premières pièces."
      image="/images/noeud2.jpg"
      interest="sneakers"
    />
  );
}
