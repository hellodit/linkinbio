export interface Product {
  id: string;
  slug: string;
  category: string;
  type: string;
  name: string;
  thumbnail: string;
  coverImage: string;
  url: string;
  price: number;
  original_price?: number;
  is_featured?: boolean;
  summary: string;
  description: string;
  highlights: string[];
  sneakPeek: string[];
}
