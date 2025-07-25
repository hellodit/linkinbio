export interface Product {
  id: string;
  category: string;
  type: string;
  name: string;
  thumbnail: string;
  url: string;
  price: number;
  original_price?: number;
  is_featured?: boolean;
} 