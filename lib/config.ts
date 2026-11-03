// Réglages globaux du site. Modifiez ces valeurs sans toucher au reste du code.

export const siteConfig = {
  brandName: "Axel Bornav Couture",
  tagline: "L'élégance jusqu'au bout de vos pas",
  // Interrupteur précommande : true = boutons "Précommander", false = vente normale.
  preorderEnabled: false,
  preorderMessage: "Livraison estimée dans 5 à 6 semaines.",
  shippingMessage: "Livraison et droits de douane inclus.",
  announcementBar:
    "Livraison et droits de douane inclus en France et aux États-Unis — Précommande, premier lot numéroté",
  contactEmail: "contact@axelbornav.com",
  supportEmail: "service-client@axelbornav.com",
  launchDate: "Mars 2027",
  returnDays: 14,
} as const;

export const countries = {
  FR: {
    code: "FR",
    label: "France",
    currency: "EUR",
    currencySymbol: "€",
    locale: "fr-FR",
    priceField: "priceFR",
    taxNote: "TVA 20 % incluse",
  },
  US: {
    code: "US",
    label: "États-Unis",
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    priceField: "priceUS",
    taxNote: "Taxe de vente locale en sus",
  },
} as const;

export type CountryCode = keyof typeof countries;
