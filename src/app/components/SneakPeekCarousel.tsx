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
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type SneakPeekCarouselProps = {
  images: string[];
  productName: string;
};

export function SneakPeekCarousel({ images, productName }: SneakPeekCarouselProps) {
  const autoplay = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!isLightboxOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
        return;
      }
      if (images.length > 1) {
        if (event.key === "ArrowLeft") {
          setActiveIndex((i) => (i - 1 + images.length) % images.length);
        } else if (event.key === "ArrowRight") {
          setActiveIndex((i) => (i + 1) % images.length);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, images.length]);

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
              <button
                type="button"
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card w-full text-left focus:outline-none focus:ring-2 focus:ring-primary/50"
                onClick={() => {
                  setActiveIndex(index);
                  setIsLightboxOpen(true);
                }}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={src}
                    alt={`${productName} preview ${index + 1}`}
                    fill
                    sizes="(min-width: 1280px) 960px, (min-width: 768px) 80vw, 100vw"
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    priority={index === 0}
                    quality={75}
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white">
                      Klik untuk perbesar
                    </span>
                  </div>
                </div>
              </button>
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

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview gambar ${productName}`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative h-[85vh] w-[92vw] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${productName} preview besar ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
              quality={90}
            />

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Sebelumnya"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow hover:bg-white"
                  onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Selanjutnya"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow hover:bg-white"
                  onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}

            <button
              type="button"
              aria-label="Tutup"
              className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-black shadow hover:bg-white"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : null}
    </Carousel>
  );
}
