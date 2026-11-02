import fs from "fs";
import path from "path";
import type { Product } from "./types";

const PRODUCTS_DIR = path.join(process.cwd(), "data", "products");

// Chaque produit est un simple fichier JSON dans data/products/.
// Pour ajouter un produit : copier un fichier existant, changer le "slug"
// et les autres valeurs, enregistrer. Aucune autre modification nécessaire.
export function getAllProducts(): Product[] {
  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(PRODUCTS_DIR, file), "utf-8");
      return JSON.parse(raw) as Product;
    })
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getProductsByFamily(family: Product["family"]): Product[] {
  return getAllProducts().filter((p) => p.family === family);
}

export function getProductsByGender(gender: Product["gender"]): Product[] {
  return getAllProducts().filter((p) => p.gender === gender);
}
