"use client";
import React from "react";
import PartnerCard from "./PartnerCard";

// Mock data based on the HTML structure provided
const nationalTalentPartners = [
  {
    id: 1,
    name: "MAS Holdings",
    logo: "/images/partnerPortal/Logo_of_MAS_Holdings.png",
    category: "National Talent Partner",
    description: "Global leader in consumer goods with diverse opportunities for young talent.",
    link: "https://masholdings.com/"
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
        <div className="flex flex-col lg:flex-row justify-center gap-16 lg:gap-24">
          
          {/* National Talent Partners */}
          <div className="flex-1 max-w-lg mx-auto lg:mx-0">
            <h3 className="text-3xl font-bold text-center mb-6 text-gray-900">
              National Talent Partner
            </h3>
            <hr className="border-gray-300 mb-14" />
            
            <div className="flex justify-center">
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
