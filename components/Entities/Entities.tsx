"use client";

import {
  entities,
  entitiesHeader,
  entitiesSubheader,
  entitiesCtaText,
  entitiesCtaLink,
} from "../../constants/entities";
import { EntitiesGrid } from "./subcomponents/EntitiesGrid";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Entities() {
  const spotlightColor = `rgba(3, 126, 243, 0.15)`;
  return (
    <SpotlightWrapper spotlightColor={spotlightColor}>
      <section
        id="entities"
        className="relative py-20 sm:py-24 md:py-32 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 overflow-hidden"
      >
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-8 w-32 h-32 bg-blue-400/10 rounded-full opacity-60 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-8 w-40 h-40 bg-blue-500/8 rounded-full opacity-50 blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300/12 rounded-full opacity-40 blur-2xl animate-float" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-16 sm:mb-20 md:mb-24 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 sm:mb-8 text-balance text-slate-800 tracking-tight leading-[0.9]">
              <span className="font-extralight">Our</span>{" "}
              <span className="font-semibold" style={{ color: "#037EF3" }}>
                Local Chapters
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed text-pretty max-w-4xl mx-auto font-light">
              {entitiesSubheader}
            </p>
          </div>

          <EntitiesGrid entities={entities} />
        </div>
      </section>
    </SpotlightWrapper>
  );
}
