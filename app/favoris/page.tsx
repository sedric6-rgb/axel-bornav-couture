import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { FavorisClient } from "./FavorisClient";

export const metadata: Metadata = { title: "Favoris" };

export default function FavorisPage() {
  const allProducts = getAllProducts();
  return <FavorisClient allProducts={allProducts} />;
}
