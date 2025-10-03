"use client";

import {
  exploreOpportunitiesHeader,
  exploreOpportunitiesSubheader,
  opportunities
} from "../../constants/exploreOpportunities";
import { OpportunityCard } from "./subcomponents/OpportunityCard";
import SpotlightWrapper from "@/components/SpotlightWrapper";

export function ExploreOpportunities() {
  const spotlightColor = `rgba(3, 126, 243, 0.25)`;
  return (
    <SpotlightWrapper spotlightColor={spotlightColor}>
      <section id="explore-opportunities" className="py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-gray-900">
              {exploreOpportunitiesHeader}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed text-pretty">
              {exploreOpportunitiesSubheader}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {opportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}
          </div>
        </div>
      </section>
    </SpotlightWrapper>
  );
}
