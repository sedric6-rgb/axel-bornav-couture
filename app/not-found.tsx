import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-6 py-32 text-center">
      <p className="text-xs tracking-label text-muted mb-4">Erreur 404</p>
      <h1 className="font-serif text-4xl md:text-5xl mb-6">Page introuvable</h1>
      <p className="text-sm text-muted leading-relaxed mb-10">
        Cette page n&apos;existe pas ou plus. Peut-être cherchiez-vous l&apos;une de
        nos collections ?
      </p>
      <Link
        href="/"
        className="inline-block border border-ink px-8 py-3 text-xs tracking-label hover:bg-ink hover:text-cream transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
