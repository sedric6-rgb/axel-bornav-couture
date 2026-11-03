import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://axel-bornav-couture.vercel.app";

const staticPaths = [
  "",
  "/femme",
  "/femme/tongs",
  "/femme/talons",
  "/homme",
  "/homme/chaussures-homme",
  "/homme/sneakers",
  "/coffret",
  "/la-maison",
  "/liste-attente",
  "/service-client",
  "/service-client/livraison",
  "/service-client/retours",
  "/service-client/pointures",
  "/service-client/entretien",
  "/service-client/faq",
  "/service-client/contact",
  "/mentions-legales",
  "/cgv",
  "/confidentialite",
  "/cookies",
  "/retractation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();

  return [
    ...staticPaths.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
    })),
    ...products.map((p) => ({
      url: `${BASE_URL}/produit/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
