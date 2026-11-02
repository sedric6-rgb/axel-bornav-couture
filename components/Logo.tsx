import Link from "next/link";

export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const primary = tone === "dark" ? "text-ink" : "text-cream";
  const secondary = tone === "dark" ? "text-muted" : "text-cream/70";

  return (
    <Link
      href="/"
      aria-label="Axel Bornav Couture — Accueil"
      className={`flex flex-col items-center leading-none ${className}`}
    >
      <span className={`font-serif text-xl md:text-2xl tracking-[0.18em] ${primary}`}>
        AXEL BORNAV
      </span>
      <span className={`text-[0.55rem] md:text-[0.6rem] tracking-[0.4em] mt-1 ${secondary}`}>
        COUTURE
      </span>
    </Link>
  );
}
