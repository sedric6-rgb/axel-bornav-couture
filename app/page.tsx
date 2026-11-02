import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/config";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src="/images/gamme.jpg"
          alt="Collection Axel Bornav Couture"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="relative h-full flex flex-col items-center justify-end text-center px-6 pb-20 text-cream">
          <FadeIn>
            <p className="text-xs tracking-label mb-4 opacity-90">
              Précommande — Premier lot numéroté
            </p>
            <h1 className="font-serif text-4xl md:text-6xl mb-6">
              {siteConfig.tagline}
            </h1>
            <Link
              href="/femme"
              className="inline-block border border-cream px-8 py-3 text-xs tracking-label hover:bg-cream hover:text-ink transition-colors"
            >
              Découvrir la collection
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        <FadeIn>
          <Link href="/femme/tongs" className="group block relative h-[480px] overflow-hidden">
            <Image
              src="/images/cravate.jpg"
              alt="Collection Tongs Axel Bornav Couture"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/20 transition-colors" />
            <div className="absolute bottom-8 left-8 text-cream">
              <h2 className="font-serif text-3xl mb-2">Tongs</h2>
              <span className="text-xs tracking-label border-b border-cream pb-1">
                Voir la collection
              </span>
            </div>
          </Link>
        </FadeIn>
        <FadeIn delay={100}>
          <Link href="/femme/talons" className="group block relative h-[480px] overflow-hidden">
            <Image
              src="/images/croisees.jpg"
              alt="Collection Talons Axel Bornav Couture"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/20 transition-colors" />
            <div className="absolute bottom-8 left-8 text-cream">
              <h2 className="font-serif text-3xl mb-2">Talons</h2>
              <span className="text-xs tracking-label border-b border-cream pb-1">
                Voir la collection
              </span>
            </div>
          </Link>
        </FadeIn>
      </section>

      {/* La Maison */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-8 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <FadeIn className="relative h-[420px] order-2 md:order-1">
          <Image
            src="/images/boucle2.jpg"
            alt="Savoir-faire Axel Bornav Couture"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </FadeIn>
        <FadeIn className="order-1 md:order-2" delay={100}>
          <p className="text-xs tracking-label text-muted mb-4">La Maison</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            L&apos;élégance de la chemise sur mesure, au bout des pas
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-8 max-w-md">
            Cravate nouée, nœud papillon, boutons nacrés, boucle dorée : chaque
            modèle emprunte à la garde-robe de la chemise sur mesure un détail
            précis, retranscrit en cuir par des mains expertes.
          </p>
          <Link
            href="/la-maison"
            className="text-xs tracking-label border-b border-ink pb-1 hover:text-accent hover:border-accent transition-colors"
          >
            Découvrir la Maison
          </Link>
        </FadeIn>
      </section>

      {/* Coffret */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <Image
          src="/images/coffret.jpg"
          alt="Coffret Axel Bornav Couture"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-cream">
          <FadeIn>
            <p className="text-xs tracking-label mb-4 opacity-90">Coffret et cadeaux</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-6 max-w-2xl">
              Chaque paire est livrée dans son coffret signature
            </h2>
            <Link
              href="/coffret"
              className="inline-block border border-cream px-8 py-3 text-xs tracking-label hover:bg-cream hover:text-ink transition-colors"
            >
              Découvrir le coffret
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
