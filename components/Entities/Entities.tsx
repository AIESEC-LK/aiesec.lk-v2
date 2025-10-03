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

export function Entities() {
  const spotlightColor = `rgba(3, 126, 243, 0.25)`;
  return (
    <SpotlightWrapper spotlightColor={spotlightColor}>
      <section id="entities" className=" bg-white ">
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

        </div>
      </section>
    </SpotlightWrapper>
  );
}
