"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/images/lifestyle-group-steps.jpg", alt: "Amis portant Axel Bornav Couture" },
  { src: "/images/lifestyle-woman-bench.jpg", alt: "Tongs Axel Bornav Couture en ville" },
  { src: "/images/lifestyle-group-heels.jpg", alt: "Escarpins Axel Bornav Couture" },
  { src: "/images/lifestyle-man-city.jpg", alt: "Sneaker Axel Bornav Couture en ville" },
  { src: "/images/lifestyle-paris-street.jpg", alt: "Axel Bornav Couture à Paris" },
];

export function MobileHeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
        />
      ))}
    </div>
  );
}
