import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "La Maison" };

export default function LaMaisonPage() {
  return (
    <div>
      <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <Image src="/images/gamme.jpg" alt="La Maison Axel Bornav Couture" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-cream">
          <p className="text-xs tracking-label mb-3 opacity-90">La Maison</p>
          <h1 className="font-serif text-4xl md:text-5xl max-w-2xl">{siteConfig.tagline}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 space-y-16">
        <FadeIn>
          <p className="text-xs tracking-label text-muted mb-4">Notre histoire</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-5">
            Une Maison née d&apos;un détail de chemise
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            {siteConfig.brandName} est née d&apos;une idée simple : transposer dans
            la chaussure les détails les plus précis de la chemise sur mesure,
            cravate nouée, nœud papillon, boutons nacrés, boucle de ceinture,
            pour en faire des objets de cuir aussi soignés qu&apos;une pièce de
            garde-robe habillée. Un cran sous les maisons les plus
            spectaculaires, mais avec la même exigence de finition.
          </p>
        </FadeIn>

        <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative h-80">
            <Image src="/images/boucle2.jpg" alt="Savoir-faire Axel Bornav Couture" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div>
            <p className="text-xs tracking-label text-muted mb-4">Savoir-faire</p>
            <h2 className="font-serif text-2xl md:text-3xl mb-5">
              Un geste couture, en cuir
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Chaque modèle est pensé comme un accessoire de mode à part
              entière : des mains expertes nouent, cousent et posent chaque
              détail — nœud, bouton, boucle — avec la précision d&apos;un
              chemisier. Sur demande, vos initiales peuvent être brodées à
              l&apos;intérieur de la chaussure, et chaque paire bénéficie d&apos;une
              garantie de réparation.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <p className="text-xs tracking-label text-muted mb-4">Matières</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-5">
            Cuir pleine fleur et finitions dorées
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Nos tongs et sandales sont travaillées en cuir pleine fleur, sur
            une semelle intérieure moelleuse, avec des quincailleries dorées
            ou des boutons nacrés selon les modèles.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
