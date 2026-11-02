"use client";

import { useWishlist } from "@/context/WishlistContext";

export function WishlistHeart({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={saved}
      aria-label={saved ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={`text-ink hover:text-accent transition-colors ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 21s-7.5-4.6-10-9.3C.3 8 2 4 6 4c2.1 0 3.8 1.3 6 3.8C14.2 5.3 15.9 4 18 4c4 0 5.7 4 4 7.7C19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
}
