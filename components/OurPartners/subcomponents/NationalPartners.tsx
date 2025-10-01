"use client"
import React, { useEffect, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { nationalPartners } from '@/constants/patners'
import * as Autoplay from 'embla-carousel-autoplay'
import NationalPartnerCard from './NationalPartnerCard'

const NationalPartners = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
        National Partners
      </h3>
      <div className="relative">
        {/* Auto-playing Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay.default({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full py-4 "
        >
          <CarouselContent className="flex items-center py-4">
            {nationalPartners.map((partner, index) => (
              <CarouselItem
                key={index}
                className="
                      shrink-0 grow-0
                      basis-full
                      sm:basis-1/2
                      md:basis-1/2
                      lg:basis-1/4
                      px-2
                      flex
                      justify-center
                    "
              >
                <div className="w-full max-w-xs">
                  <NationalPartnerCard partner={partner} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === current - 1
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NationalPartners
