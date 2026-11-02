import { countries, type CountryCode } from "./config";
import type { Product } from "./types";

export function formatPrice(product: Product, country: CountryCode): string {
  const c = countries[country];
  const amount = country === "FR" ? product.priceFR : product.priceUS;
  return new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency: c.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
