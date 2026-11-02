"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface WishlistContextValue {
  items: string[];
  isSaved: (slug: string) => boolean;
  toggle: (slug: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "abc-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage once mounted; SSR/first paint safely uses the empty default above
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // stockage indisponible
    }
  }, []);

  function persist(next: string[]) {
    setItems(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // stockage indisponible
    }
  }

  function toggle(slug: string) {
    persist(items.includes(slug) ? items.filter((s) => s !== slug) : [...items, slug]);
  }

  return (
    <WishlistContext.Provider
      value={{ items, isSaved: (slug) => items.includes(slug), toggle }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist doit être utilisé dans WishlistProvider");
  return ctx;
}
