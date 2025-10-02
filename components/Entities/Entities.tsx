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
    <section id="entities" className="py-62 bg-whitee ">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            {entitiesHeader}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
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
