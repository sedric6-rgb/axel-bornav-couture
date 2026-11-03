import Link from "next/link";
import Image from "next/image";

export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  // tone "dark" = dark logo marks, for light (cream) backgrounds.
  // tone "light" = white logo marks, for dark (ink) backgrounds.
  const src = tone === "dark" ? "/brand/logo-light.png" : "/brand/logo-dark.png";

  return (
    <Link
      href="/"
      aria-label="Axel Bornav Couture — Accueil"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src={src}
        alt="Axel Bornav Couture"
        width={1916}
        height={948}
        priority
        className="h-11 md:h-14 w-auto"
      />
    </Link>
  );
}
