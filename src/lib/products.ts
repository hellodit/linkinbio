import productsData from "@/app/data/products.json";
import { Product } from "@/app/types/product";

const products: Product[] = productsData as Product[];

export function getProducts(): Product[] {
  return products;
}

export function getProductSlugs(): string[] {
  return products.map((product) => product.slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
