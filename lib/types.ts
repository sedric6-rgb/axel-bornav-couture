export type ProductStatus = "disponible" | "precommande" | "bientot";

export type ProductFamily = "Tongs" | "Talons" | "Chaussures homme" | "Sneakers";

export type ProductGender = "femme" | "homme";

export interface ProductVariant {
  label: string;
  type: "semelle" | "laniere" | "coloris";
}

export interface Product {
  slug: string;
  name: string;
  family: ProductFamily;
  gender: ProductGender;
  priceFR: number;
  priceUS: number;
  shortDescription: string;
  description: string;
  images: string[];
  soleColors?: string[];
  strapColors?: string[];
  colorways?: string[];
  sizesEU: number[];
  status: ProductStatus;
  materials?: string;
  care?: string;
}

export interface WaitlistEntry {
  email: string;
  firstName: string;
  country: string;
  interest: "femme" | "homme" | "sneakers" | "general";
}
