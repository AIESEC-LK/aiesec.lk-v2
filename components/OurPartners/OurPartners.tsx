"use client";
import React, { useState, useRef, useEffect } from "react";
import { nationalPartners } from "@/constants/patners";
import { globalPartners } from "@/constants/patners";
import NationalPartnerCard from "./subcomponents/NationalPartnerCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "../ui/carousel";
import * as Autoplay from "embla-carousel-autoplay";

const OurPartners = () => {
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
    <section id="partners" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Our <span className="text-primary">Partners</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
            We collaborate with leading organizations to create meaningful
            opportunities for youth development.
          </p>
        </div>

        {/* National Partners */}
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
              className="w-full"
            >
              <CarouselContent>
                {nationalPartners.map((partner, index) => (
                  <CarouselItem key={index} className="basis-1/4">
                    <NationalPartnerCard partner={partner} />
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

        {/* Global Partners */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
            Global Affiliations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {globalPartners.map((partner, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 flex items-center justify-center hover:border-secondary/50 transition-all"
              >
                <span className="text-sm font-semibold text-muted-foreground text-center">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Interested in partnering with AIESEC?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center text-primary hover:text-primary/80 font-semibold text-lg"
          >
            Partner With Us →
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
