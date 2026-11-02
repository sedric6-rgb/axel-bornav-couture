"use client";

import type { ReactNode } from "react";
import { CountryProvider } from "./CountryContext";
import { WishlistProvider } from "./WishlistContext";
import { CartProvider } from "./CartContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CountryProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </CountryProvider>
  );
}
