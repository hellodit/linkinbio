"use client";

import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type SneakPeekCarouselProps = {
  images: string[];
  productName: string;
};

export function SneakPeekCarousel({ images, productName }: SneakPeekCarouselProps) {
  const autoplay = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  if (!images || images.length === 0) {
    return null;
  }

  const enableAutoplay = images.length > 1;

  return (
    <Carousel
      opts={{ align: "start", loop: enableAutoplay }}
      plugins={enableAutoplay ? [autoplay.current] : []}
      className="w-full"
      onMouseEnter={enableAutoplay ? autoplay.current.stop : undefined}
      onMouseLeave={enableAutoplay ? autoplay.current.reset : undefined}
    >
      <div className="relative">
        <CarouselContent className="-ml-4">
          {images.map((src, index) => (
            <CarouselItem key={src + index} className="pl-4 basis-full">
              <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={src}
                    alt={`${productName} preview ${index + 1}`}
                    fill
                    sizes="(min-width: 1280px) 960px, (min-width: 768px) 80vw, 100vw"
                    className="object-cover"
                    priority={index === 0}
                    quality={75}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 ? (
          <>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
          </>
        ) : null}
      </div>
    </Carousel>
  );
}
