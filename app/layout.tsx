import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CookieBanner } from "@/components/CookieBanner";
import { getAllProducts } from "@/lib/products";
import { siteConfig } from "@/lib/config";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.brandName}`,
  },
  description:
    "Axel Bornav Couture, chaussures de luxe sur le thème de la chemise sur mesure : tongs, escarpins et sandales. Livraison et droits de douane inclus en France et aux États-Unis.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const searchIndex = getAllProducts().map((p) => ({
    slug: p.slug,
    name: p.name,
    family: p.family,
    shortDescription: p.shortDescription,
  }));

  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Providers>
          <AnnouncementBar />
          <Header searchIndex={searchIndex} />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
