"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <div>
      <div className="flex gap-4">
        {images.length > 1 && (
          <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                className={`relative aspect-square border ${
                  active === i ? "border-ink" : "border-transparent"
                }`}
                aria-label={`Voir la photo ${i + 1}`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative flex-1 aspect-[4/5] bg-ink/5 overflow-hidden cursor-zoom-in"
          aria-label="Agrandir la photo"
        >
          <Image
            src={images[active]}
            alt={name}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </button>
      </div>

      {images.length > 1 && (
        <div className="flex md:hidden gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              className={`relative w-14 h-14 border ${
                active === i ? "border-ink" : "border-transparent"
              }`}
              aria-label={`Voir la photo ${i + 1}`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="56px" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 bg-ink/90 z-[70] flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Fermer"
            className="absolute top-6 right-6 text-cream text-3xl leading-none"
          >
            ×
          </button>
          <div className="relative w-full h-full max-w-4xl">
            <Image
              src={images[active]}
              alt={name}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
