import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = { title: "Coffret et cadeaux" };

const details = [
  "Boîte rigide noire, logo doré sur le couvercle",
  "Papier de soie monogrammé AB",
  "Pochon en satin noir",
  "Carte de la Maison",
];

export default function CoffretPage() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <Image src="/images/coffret.jpg" alt="Coffret Axel Bornav Couture" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-cream">
          <p className="text-xs tracking-label mb-3 opacity-90">Coffret et cadeaux</p>
          <h1 className="font-serif text-4xl md:text-5xl max-w-xl">
            Un écrin digne de chaque paire
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <FadeIn>
          <p className="text-sm text-muted leading-relaxed mb-10 text-center">
            Chaque paire {`Axel Bornav Couture`} est livrée dans son coffret
            signature, inclus dans le prix — pensé pour l&apos;achat plaisir comme
            pour le cadeau.
          </p>
        </FadeIn>
        <FadeIn>
          <ul className="space-y-4 max-w-md mx-auto">
            {details.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-ink">
                <span className="text-gold mt-1">—</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn className="text-center mt-14">
          <Link
            href="/femme"
            className="inline-block border border-ink px-8 py-3 text-xs tracking-label hover:bg-ink hover:text-cream transition-colors"
          >
            Découvrir la collection
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
