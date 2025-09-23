import { ReactNode } from "react";

export interface ProductFrontmatter {
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
  position?: number;
  ctaLabel?: string;
  ctaUrl?: string;
  ctaHelperText?: string;
  disableStickyCta?: boolean;
}

export interface ProductDocument extends ProductFrontmatter {
  content: ReactNode;
}

export type Product = ProductFrontmatter;
