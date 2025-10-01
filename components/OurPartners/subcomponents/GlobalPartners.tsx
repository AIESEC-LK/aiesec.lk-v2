import React from "react";
import { globalPartners } from "@/constants/patners";
import GlobalPartnerCard from "./GlobalPartnerCard";

const GlobalPartners = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
        Global Affiliations
      </h3>
      <div className="flex flex-wrap justify-center gap-6">
        {globalPartners.map((partner, index) => (
          <div
            key={index}
            className="w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(16.666%-1.25rem)]"
          >
            <GlobalPartnerCard partner={partner} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalPartners;
