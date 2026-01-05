"use client";

import { TextCarousel } from "./TextCarousel";
import { heroConstants } from "@/constants/hero";

export function HeroHeading() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <h1 className="text-6xl sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light leading-[0.8] sm:leading-[0.85] md:leading-[0.9] text-balance tracking-tight">
        <span className="text-slate-800 font-extralight text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl block mb-3 sm:mb-4">
          {heroConstants.heading.prefix}
        </span>

        <TextCarousel />

        <span className="text-slate-700 font-light text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl block mt-3 sm:mt-4">
          {heroConstants.heading.suffix}
        </span>
      </h1>
    </div>
  );
}
