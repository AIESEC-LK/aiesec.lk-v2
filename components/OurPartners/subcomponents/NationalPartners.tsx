"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { nationalPartners } from "@/constants/patners";
import * as Autoplay from "embla-carousel-autoplay";
import NationalPartnerCard from "./NationalPartnerCard";

const NationalPartners = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Optimize autoplay with longer delay and reduced performance impact
  const autoplayRef = React.useRef(
    Autoplay.default({
      delay: 6000, // Increased delay to reduce frequency
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  // Memoize the carousel options to prevent recreation
  const carouselOptions = useMemo(
    () => ({
      align: "start" as const,
      loop: true,
      duration: 100, // Increased duration for smoother transitions
      dragFree: true,
      skipSnaps: false,
    }),
    []
  );

  // Optimize event handlers with useCallback
  const handleMouseEnter = useCallback(() => {
    autoplayRef.current.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    autoplayRef.current.play();
  }, []);

  const handleDotClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

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

  // Memoize dots to prevent unnecessary re-renders
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          onClick={() => handleDotClick(index)}
          className={`w-3 h-3 rounded-full transition-all ${
            index === current - 1 ? "bg-white" : "bg-white/30 hover:bg-white/50"
          }`}
        />
      )),
    [count, current, handleDotClick]
  );

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-8 text-center text-white">
        National Partners
      </h3>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Auto-playing Carousel */}
        <Carousel
          setApi={setApi}
          opts={carouselOptions}
          plugins={[autoplayRef.current]}
          className="w-full py-4"
        >
          <CarouselContent className="flex items-center py-4">
            {nationalPartners.map((partner, index) => (
              <CarouselItem
                key={partner.name || index}
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
        <div className="flex justify-center mt-6 space-x-2">{dots}</div>
      </div>
    </div>
  );
};

export default NationalPartners;
