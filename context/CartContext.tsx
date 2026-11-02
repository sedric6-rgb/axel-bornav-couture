"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartLine {
  id: string; // slug + variante + pointure, pour distinguer chaque ligne
  slug: string;
  name: string;
  image: string;
  variantLabel?: string;
  sizeEU: number;
  quantity: number;
  priceFR: number;
  priceUS: number;
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addLine: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  removeLine: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "abc-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage once mounted; SSR/first paint safely uses the empty default above
      if (stored) setLines(JSON.parse(stored));
    } catch {
      // stockage indisponible
    }
  }, []);

  function persist(next: CartLine[]) {
    setLines(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // stockage indisponible
    }
  }

  function addLine(line: Omit<CartLine, "quantity"> & { quantity?: number }) {
    const quantity = line.quantity ?? 1;
    const existing = lines.find((l) => l.id === line.id);
    if (existing) {
      persist(
        lines.map((l) =>
          l.id === line.id ? { ...l, quantity: l.quantity + quantity } : l
        )
      );
    } else {
      persist([...lines, { ...line, quantity }]);
    }
    setIsOpen(true);
  }

  function removeLine(id: string) {
    persist(lines.filter((l) => l.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      removeLine(id);
      return;
    }
    persist(lines.map((l) => (l.id === id ? { ...l, quantity } : l)));
  }

  const count = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addLine,
        removeLine,
        updateQuantity,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans CartProvider");
  return ctx;
}
