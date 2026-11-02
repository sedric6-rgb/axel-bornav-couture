export interface PreorderRequest {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  items: {
    slug: string;
    name: string;
    variantLabel?: string;
    sizeEU: number;
    quantity: number;
  }[];
}
