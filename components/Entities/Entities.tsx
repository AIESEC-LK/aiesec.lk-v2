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
  const spotlightColor = `rgba(3, 126, 243, 0.25)`;
  return (
    <SpotlightWrapper spotlightColor={spotlightColor}>
      <section id="entities" className="py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-gray-900 tracking-tight">
              {entitiesHeader}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed text-pretty max-w-3xl mx-auto">
              {entitiesSubheader}
            </p>
          </div>

          <EntitiesGrid entities={entities} />
        </div>
      </section>
    </SpotlightWrapper>
  );
}
