"use client";

import { SneakPeekCarousel } from "@/app/components/SneakPeekCarousel";

interface SneakPeekProps {
  images: string[];
  productName: string;
}

export function SneakPeek({ images, productName }: SneakPeekProps) {
  if (!Array.isArray(images) || images.length === 0) return null;
  return <SneakPeekCarousel images={images} productName={productName} />;
}

export default SneakPeek;

