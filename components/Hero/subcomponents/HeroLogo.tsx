"use client";

import Image from "next/image";
import { heroConstants } from "@/constants/hero";

export function HeroLogo() {
  return (
    <div className="inline-block mb-6 sm:mb-8">
      <Image
        src={heroConstants.logo.src}
        alt={heroConstants.logo.alt}
        width={heroConstants.logo.width}
        height={heroConstants.logo.height}
        className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12 lg:w-28 lg:h-14 xl:w-32 xl:h-16 object-contain hover:scale-105 transition-transform duration-300"
        priority
      />
    </div>
  );
}
