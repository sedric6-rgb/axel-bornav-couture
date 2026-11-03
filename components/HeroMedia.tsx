"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MobileHeroSlideshow } from "./MobileHeroSlideshow";

// Décide, une fois côté client, quelle version charger — pour que le
// téléphone ne télécharge jamais la vidéo (seulement les photos), et
// que l'ordinateur/la tablette ne charge pas inutilement le diaporama.
type Mode = "loading" | "mobile" | "desktop-video" | "desktop-static";

export function HeroMedia() {
  const [mode, setMode] = useState<Mode>("loading");

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- decide the right media once mounted; SSR/first paint safely shows the static poster above
    setMode(
      isDesktop ? (reduceMotion ? "desktop-static" : "desktop-video") : "mobile"
    );
  }, []);

  if (mode === "mobile") return <MobileHeroSlideshow />;

  if (mode === "desktop-video") {
    return (
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/video/coffret-hero-poster.jpg"
      >
        <source src="/video/coffret-hero.webm" type="video/webm" />
        <source src="/video/coffret-hero.mp4" type="video/mp4" />
      </video>
    );
  }

  // "loading" (premier rendu, avant que le navigateur ait tranché) ou
  // "desktop-static" (mouvement réduit demandé) : image fixe, légère.
  return (
    <Image
      src="/video/coffret-hero-poster.jpg"
      alt="Axel Bornav Couture"
      fill
      priority
      className="object-cover"
      sizes="100vw"
    />
  );
}
