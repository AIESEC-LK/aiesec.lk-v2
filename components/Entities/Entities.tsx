"use client";

import {
  entities,
  entitiesHeader,
  entitiesSubheader,
  entitiesCtaText,
  entitiesCtaLink,
} from "../../constants/entities";
import { EntitiesGrid } from "./subcomponents/EntitiesGrid";

export function Entities() {
  return (
    <section id="entities" className="py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-tight text-balance mb-8">
            {entitiesHeader}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light text-pretty">
            {entitiesSubheader}
          </p>
        </div>
        <EntitiesGrid entities={entities} />
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-4 font-light">
            {entitiesCtaText}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center text-gray-900 hover:text-gray-600 font-normal text-lg"
          >
            {entitiesCtaLink}
          </a>
        </div>
      </div>
    </section>
  );
}
