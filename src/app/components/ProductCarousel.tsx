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
import { Product } from "@/app/types/product";
import Image from "next/image";

export function ProductCarousel() {
  // Filter dan mapping data dari products.json
  const productList = (products as Product[]).map((item): Product => ({
    id: item.id,
    name: item.name,
    thumbnail: item.thumbnail,
    url: item.url,
    price: item.price,
    is_featured: item.is_featured,
    category: item.category,
    type: item.type,
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
              <div className="bg-card rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-all duration-200">
                <div className="flex flex-col h-full">
                  {/* Thumbnail */}
                  <div className="h-40 w-full relative">
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-t-lg"
                      fill
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  {/* Info */}
                  <div className="p-3 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="font-bold text-sm text-foreground mb-1 line-clamp-2 min-h-[40px]">
                        {product.name}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Price</div>
                        <div className="text-sm font-bold text-foreground">
                          {formatRupiah(product.price)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">Status</div>
                        <div className="text-sm font-bold text-foreground">
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