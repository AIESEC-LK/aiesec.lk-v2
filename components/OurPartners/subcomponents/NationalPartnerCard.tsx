"use client";
import React, { memo, useMemo } from "react";
import Link from "next/link";
import { NationalPartnerCardProps } from "@/types/partner";

const NationalPartnerCard = memo(({ partner }: NationalPartnerCardProps) => {
  // Use static colors to eliminate flickering from color extraction
  const colors = ["#6366f1", "#8b5cf6", "#ec4899"];

  // Memoize gradient style with static colors to prevent flickering
  const gradientStyle = useMemo(
    () => ({
      background: `linear-gradient(135deg, ${colors[0]}20, ${colors[1]}20, ${colors[2]}20)`,
    }),
    [] // Empty dependency array since colors are static
  );

  const cardContent = (
    <div className="max-w-xs group cursor-pointer mx-auto">
      {/* Card Container - Enhanced */}
      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-96 flex flex-col hover:bg-gradient-to-br hover:from-white hover:to-gray-50 group-hover:-translate-y-1">
        {/* Image Section - Simplified for performance */}
        <div
          className="relative w-full h-64 group-hover:h-48 rounded-t-2xl overflow-hidden transition-all duration-300 ease-out"
          style={gradientStyle}
        >
          {/* Single image element only */}
          <div className="relative h-full flex items-center justify-center p-6">
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-300 ease-out drop-shadow-lg"
              style={{
                maxHeight: "60%",
                filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))",
              }}
              loading="lazy"
            />
          </div>

          {/* Enhanced overlay with subtle patterns */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10"></div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
        </div>

        {/* Content Section - Enhanced */}
        <div className="relative bg-gradient-to-br from-white via-white to-gray-50/30 flex-1 px-6 py-4 flex flex-col justify-between">
          {/* Title */}
          <h3 className="text-xl font-bold text-center mb-2 group-hover:text-[#037EF3] transition-colors duration-300 text-gray-800">
            {partner.name}
          </h3>

          {/* Description */}
          <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-24 group-hover:opacity-100 transition-all duration-400 ease-out">
            <p className="text-sm text-center text-gray-600 group-hover:text-gray-700 mb-3 transition-colors duration-300 leading-relaxed">
              {partner.description}
            </p>
          </div>

          {/* Category Badge */}
          <div className="flex justify-center">
            <span
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow-sm group-hover:shadow-md ${partner.category === "National Partner"
                  ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 group-hover:from-amber-200 group-hover:to-yellow-200"
                  : partner.category === "National Talent Partner"
                    ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 group-hover:from-emerald-200 group-hover:to-green-200"
                    : "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 group-hover:from-slate-200 group-hover:to-gray-200"
                }`}
            >
              {partner.category}
            </span>
          </div>

          {/* Subtle border at bottom */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:via-indigo-300 transition-colors duration-300"></div>
        </div>
      </div>
    </div>
  );

  // Only make MAS, Cargills, and Ceylinco Life cards clickable with link to their detail pages
  if ((partner.slug === "mas" || partner.slug === "cargills" || partner.slug === "ceylinco-life") && partner.slug) {
    return <Link href={`/partner/${partner.slug}`}>{cardContent}</Link>;
  }

  return cardContent;
});

NationalPartnerCard.displayName = "NationalPartnerCard";

export default NationalPartnerCard;
