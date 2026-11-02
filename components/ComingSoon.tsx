import Image from "next/image";
import { WaitlistForm } from "./WaitlistForm";

export function ComingSoon({
  title,
  description,
  image,
  interest,
}: {
  title: string;
  description: string;
  image: string;
  interest: "homme" | "sneakers";
}) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="relative h-[420px] order-2 md:order-1">
        <Image src={image} alt={title} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
      <div className="order-1 md:order-2">
        <p className="text-xs tracking-label text-muted mb-4">Collection à venir</p>
        <h1 className="font-serif text-3xl md:text-4xl mb-6">{title}</h1>
        <p className="text-sm text-muted leading-relaxed mb-10 max-w-md">{description}</p>
        <WaitlistForm defaultInterest={interest} />
      </div>
    </div>
  );
}
