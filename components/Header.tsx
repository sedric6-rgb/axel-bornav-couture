"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "./Logo";
import { CountrySwitcher } from "./CountrySwitcher";
import { SearchOverlay, type SearchIndexItem } from "./SearchOverlay";
import { mainNav } from "@/lib/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

function IconButton({
  label,
  onClick,
  href,
  count,
  children,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  count?: number;
  children: React.ReactNode;
}) {
  const content = (
    <span className="relative inline-flex">
      {children}
      {typeof count === "number" && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-cream text-[0.6rem] w-4 h-4 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} className="text-ink hover:text-accent transition-colors">
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} className="text-ink hover:text-accent transition-colors">
      {content}
    </button>
  );
}

const icons = {
  search: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  heart: (filled: boolean) => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21s-7.5-4.6-10-9.3C.3 8 2 4 6 4c2.1 0 3.8 1.3 6 3.8C14.2 5.3 15.9 4 18 4c4 0 5.7 4 4 7.7C19.5 16.4 12 21 12 21z" />
    </svg>
  ),
  user: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
    </svg>
  ),
  bag: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  menu: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  ),
};

export function Header({ searchIndex }: { searchIndex: SearchIndexItem[] }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, openCart } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-brown/10">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8 h-20 flex items-center justify-between">
        <button
          type="button"
          className="md:hidden text-ink"
          aria-label="Ouvrir le menu"
          onClick={() => setMobileOpen(true)}
        >
          {icons.menu}
        </button>

        <nav className="hidden md:flex items-center gap-8" onMouseLeave={() => setActiveMenu(null)}>
          {mainNav.map((item) => (
            <div key={item.label} onMouseEnter={() => setActiveMenu(item.label)}>
              <Link
                href={item.href}
                className="text-[0.8rem] tracking-label text-ink hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo />
        </div>

        <div className="flex items-center gap-4 md:gap-5">
          <div className="hidden md:block">
            <CountrySwitcher />
          </div>
          <IconButton label="Rechercher" onClick={() => setSearchOpen(true)}>
            {icons.search}
          </IconButton>
          <IconButton label="Mes favoris" href="/favoris" count={wishlistItems.length}>
            {icons.heart(wishlistItems.length > 0)}
          </IconButton>
          <IconButton label="Mon compte" href="/compte">
            {icons.user}
          </IconButton>
          <IconButton label="Voir le panier" onClick={openCart} count={count}>
            {icons.bag}
          </IconButton>
        </div>
      </div>

      {/* Méga-menu */}
      {mainNav.map(
        (item) =>
          item.columns &&
          activeMenu === item.label && (
            <div
              key={item.label}
              className="hidden md:block absolute left-0 right-0 bg-cream border-t border-brown/10 shadow-xl"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="mx-auto max-w-[1400px] px-8 py-10 grid grid-cols-[1fr_1fr_1.2fr] gap-10">
                {item.columns.map((col) => (
                  <div key={col.heading}>
                    <p className="text-xs tracking-label text-muted mb-4">{col.heading}</p>
                    <ul className="space-y-3">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setActiveMenu(null)}
                            className="text-sm text-ink hover:text-accent transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {item.image && (
                  <Link
                    href={item.href}
                    onClick={() => setActiveMenu(null)}
                    className="relative block h-56 overflow-hidden group"
                  >
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="400px"
                    />
                  </Link>
                )}
              </div>
            </div>
          )
      )}

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-cream z-50 flex flex-col md:hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-brown/15">
            <Logo className="items-start" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer le menu"
              className="text-2xl leading-none text-muted hover:text-ink"
            >
              ×
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-6">
              {mainNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-xl text-ink"
                  >
                    {item.label}
                  </Link>
                  {item.columns && (
                    <ul className="mt-3 ml-3 space-y-2 border-l border-brown/15 pl-4">
                      {item.columns.flatMap((c) => c.links).map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-sm text-muted"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-brown/15">
              <CountrySwitcher />
            </div>
          </nav>
        </div>
      )}

      <SearchOverlay items={searchIndex} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
