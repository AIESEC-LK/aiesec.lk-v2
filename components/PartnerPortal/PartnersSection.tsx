"use client";
import React from "react";
import PartnerCard from "./PartnerCard";

// Partner data for the portal cards
const nationalTalentPartners = [
  {
    id: 1,
    name: "MAS Holdings",
    logo: "/images/partners/MAS - National Partner.png",
    category: "National Talent Partner",
    description: "South Asia's largest design-to-delivery solution provider in apparel and textile manufacturing. Explore opportunities and join our team!",
    link: "/partner/mas",
    isInternal: true
  },
  {
    id: 2,
    name: "Cargills",
    logo: "/images/partners/Cargills - National Partner.jpg",
    category: "National Partner",
    description: "A cornerstone of Sri Lanka's economy with over 180 years of heritage across Retail, FMCG, Restaurants, and more. Discover part-time opportunities!",
    link: "/partner/cargills",
    isInternal: true
  }
];

const nationalPartners = [
  
];

const PartnersSection = () => {
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
            
            <div className="flex flex-wrap justify-center gap-8">
              {nationalTalentPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
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
