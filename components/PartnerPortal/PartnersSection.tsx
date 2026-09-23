"use client";
import React from "react";
import PartnerCard from "./PartnerCard";
import type { PortalCompany } from "@/lib/partners";

type PartnersSectionProps = {
  // null when the database couldn't be reached
  companies: PortalCompany[] | null;
};

const PartnersSection = ({ companies }: PartnersSectionProps) => {
  return (
    <section
      id="partners"
      className="bg-white py-24 relative z-30"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-[#037EF3]">Our National</span> Partners
          </h2>
        </div>

        {/* Partners Content */}
        <div className="flex flex-col justify-center gap-16">

          {/* Featured Partners */}
          <div className="w-full">
            <h3 className="text-3xl font-bold text-center mb-6 text-gray-900">
              Featured Partners
            </h3>
            <hr className="border-gray-300 mb-14" />

            {companies && companies.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-8">
                {companies.map((company) => (
                  <PartnerCard
                    key={company.id}
                    partner={{
                      id: company.id,
                      name: company.name,
                      logo: company.logo,
                      category: company.category,
                      description: company.description ?? "",
                      link: `/partner/${company.slug}`,
                      isInternal: true,
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                {companies
                  ? "No partners to show yet. Check back soon!"
                  : "Partners are unavailable right now. Please try again later."}
              </p>
            )}
          </div>

          {/* National Partners
          <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
            <h3 className="text-3xl font-bold text-center mb-6 text-gray-900">
              National Partners
            </h3>
            <hr className="border-gray-300 mb-14" />
            
            <div className="grid md:grid-cols-2 gap-8 justify-items-center">
              {nationalPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
           */}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
