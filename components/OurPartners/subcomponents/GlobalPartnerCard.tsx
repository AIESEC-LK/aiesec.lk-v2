"use client";
import React, { useState, memo } from "react";
import { GlobalPartnerCardProps } from "@/types/partner";
import PartnerPopover from "./PartnerPopover";

const GlobalPartnerCard = memo(({ partner }: GlobalPartnerCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className="group bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center justify-center hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer h-32"
      >
        <img
          src={partner.logo}
          alt={partner.name}
          className="w-full h-full object-contain group-hover:scale-130 transition-all duration-300 ease-in-out"
          loading="lazy" // Lazy load images for better performance
        />
      </div>

      <PartnerPopover
        partner={partner}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
});

GlobalPartnerCard.displayName = "GlobalPartnerCard";

export default GlobalPartnerCard;
