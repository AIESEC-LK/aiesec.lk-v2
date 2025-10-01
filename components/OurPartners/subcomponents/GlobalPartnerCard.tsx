"use client";
import React, { useState } from "react";
import { GlobalPartnerCardProps } from "@/types/partner";
import PartnerPopover from "./PartnerPopover";

const GlobalPartnerCard = ({ partner }: GlobalPartnerCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-white border-2 border-gray-100 rounded-xl p-6 flex items-center justify-center hover:border-gray-300 transition-all duration-300 ease-in-out cursor-pointer h-32"
      >
        <img
          src={partner.logo}
          alt={partner.name}
          className="w-full h-full object-contain group-hover:scale-130 transition-all duration-300 ease-in-out"
        />
      </div>

      <PartnerPopover
        partner={partner}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default GlobalPartnerCard;
