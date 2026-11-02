import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { footerColumns } from "@/lib/navigation";
import { siteConfig } from "@/lib/config";

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "WhatsApp", href: "https://wa.me/" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-12">
        <div>
          <Logo tone="light" className="items-start" />
          <p className="mt-5 text-sm text-cream/70 max-w-xs">{siteConfig.tagline}</p>
          <div className="mt-6">
            <p className="text-xs tracking-label text-cream/60 mb-3">Restez informé</p>
            <NewsletterForm compact />
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.heading}>
            <p className="text-xs tracking-label text-cream/60 mb-4">{col.heading}</p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/85 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© Axel Bornav Couture. Tous droits réservés.</p>
          <div className="flex gap-5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
