import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://axelbornav.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/compte", "/favoris", "/panier"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
