"use client";

import {
  exploreOpportunitiesHeader,
  exploreOpportunitiesSubheader,
  opportunities,
} from "../../constants/exploreOpportunities";
import { OpportunityCard } from "./subcomponents/OpportunityCard";
import SpotlightWrapper from "@/components/SpotlightWrapper";

export function ExploreOpportunities() {
  const spotlightColor = `rgba(3, 126, 243, 0.25)`;
  return (
    <SpotlightWrapper spotlightColor={spotlightColor}>
      <section id="explore-opportunities" className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 min-h-screen flex flex-col justify-center">
          <div className="max-w-5xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 sm:mb-8 text-balance text-slate-800 tracking-tight leading-[0.9]">
              <span className="font-extralight">Explore</span>{" "}
              <span className="font-semibold" style={{ color: "#037EF3" }}>
                Opportunities
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed text-pretty max-w-4xl mx-auto font-light">
              {exploreOpportunitiesSubheader}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {opportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </div>
      </section>
    </SpotlightWrapper>
  );
}
