// Fonctions utilisables côté client (pas d'accès au système de fichiers ici).
import type { Product } from "./types";

export function getProductColors(product: Product): string[] {
  return Array.from(
    new Set([
      ...(product.soleColors ?? []),
      ...(product.strapColors ?? []),
      ...(product.colorways ?? []),
    ])
  );
}
