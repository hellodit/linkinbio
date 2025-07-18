"use client"

import React from "react";
import { formatRupiah } from "@/lib/utils";
import products from "@/app/data/products.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Product {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
  price: number;
  isFeatured?: boolean;
}

export function ProductCarousel() {
  // Filter dan mapping data dari products.json
  const productList = (products as any[]).map((item) => ({
    id: item.id, // gunakan url sebagai id unik
    name: item.name,
    thumbnail: item.thumbnail,
    url: item.url,
    price: item.price,
    isFeatured: item.is_featured,
  }));

  const autoplay = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[autoplay.current]}
      className="w-full max-w-full"
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <div className="relative">
        <CarouselContent className="-ml-4">
          {productList.map((product) => (
            <CarouselItem key={product.id} className="pl-4 basis-full">
              <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200${product.isFeatured ? " border-2 border-blue-400 animate-headShake" : ""}`}>
                <div className="flex flex-col h-full">
                  {/* Thumbnail */}
                  <div className="h-40 w-full relative">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  {/* Info */}
                  <div className="p-3 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-900 mb-1 line-clamp-2 min-h-[40px]">
                        {product.name}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Price</div>
                        <div className="text-sm font-bold text-gray-900">
                          {formatRupiah(product.price)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Status</div>
                        <div className="text-sm font-bold text-gray-900">
                          Available
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
      </div>
    </Carousel>
  );
} 