import Image from "next/image";
import { FadeIn } from "./FadeIn";

export function CategoryHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
      <Image src={image} alt={title} fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-ink/30" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-cream">
        <FadeIn>
          {subtitle && <p className="text-xs tracking-label mb-3 opacity-90">{subtitle}</p>}
          <h1 className="font-serif text-4xl md:text-5xl">{title}</h1>
        </FadeIn>
      </div>
    </section>
  );
}
