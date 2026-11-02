import type { ReactNode } from "react";

export function TextPage({
  eyebrow,
  title,
  provisional,
  children,
}: {
  eyebrow?: string;
  title: string;
  provisional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-20">
      {eyebrow && <p className="text-xs tracking-label text-muted mb-4">{eyebrow}</p>}
      <h1 className="font-serif text-3xl md:text-4xl mb-8">{title}</h1>
      {provisional && (
        <div className="bg-ink/5 border border-brown/15 px-4 py-3 text-xs text-muted mb-10">
          Texte provisoire, en attente de validation par un juriste avant la
          mise en ligne publique.
        </div>
      )}
      <div className="prose-legal text-sm text-muted leading-relaxed space-y-5">
        {children}
      </div>
    </div>
  );
}
