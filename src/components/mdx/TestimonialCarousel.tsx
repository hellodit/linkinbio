'use client'

import * as React from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

export interface Testimonial {
  id: string
  name: string
  profession: string
  review: string
  rating: number
  avatar: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoScrollInterval?: number
  className?: string
}

export function TestimonialCarousel({ 
  testimonials, 
  autoScrollInterval = 5000,
  className = ''
}: TestimonialCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // Autoplay plugin
  const autoplayPlugin = React.useRef(
    Autoplay({ 
      delay: autoScrollInterval, 
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  )

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={cn(
              "w-5 h-5",
              index < rating ? 'text-orange-400' : 'text-gray-300'
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("relative w-full max-w-lg mx-auto", className)}>
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pl-4 basis-full">
              <div className="bg-white dark:bg-card rounded-xl shadow-lg border border-border/60 p-4 md:p-6 h-full min-h-[280px] flex flex-col">
                {/* Star Rating */}
                {renderStars(testimonial.rating)}

                {/* Review Text */}
                <p className="text-gray-800 dark:text-foreground text-sm md:text-base leading-relaxed mb-4 md:mb-6 font-medium flex-grow">
                  &ldquo;{testimonial.review}&rdquo;
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 md:gap-4 mt-auto">
                  <div className="relative">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-card p-0.5">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={44}
                          height={44}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-foreground text-base md:text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-muted-foreground text-xs md:text-sm">
                      {testimonial.profession}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Arrows */}
        {testimonials.length > 1 && (
          <>
            <CarouselPrevious className="-left-4 md:-left-6" />
            <CarouselNext className="-right-4 md:-right-6" />
          </>
        )}
      </Carousel>

      {/* Navigation Dots */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index + 1 === current
                  ? 'bg-orange-400 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
