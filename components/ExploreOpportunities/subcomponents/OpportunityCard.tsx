"use client";

import Image from "next/image";
import Link from "next/link";
import { OpportunityItem } from "../../../constants/exploreOpportunities";

interface OpportunityCardProps {
  opportunity: OpportunityItem;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const {
    title,
    description,
    buttonText,
    buttonUrl,
    logoPath,
    backgroundImagePath,
    backgroundColor,
    buttonColor,
    imageOpacity = 0.7,
    overlayColor,
    badgeColor,
  } = opportunity;

  return (
    <div className="relative overflow-hidden rounded-[22px] shadow-[0_6px_18px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImagePath}
          alt={`${title} background`}
          fill
          className="object-cover"
          style={{ opacity: imageOpacity }}
        />
        <div className={`absolute inset-0 ${overlayColor ?? ""}`} />
        <div className="absolute inset-0 rounded-[22px] ring-1 ring-white/40" />
      </div>

      {/* Centered Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center min-h-[480px] p-8">
        {/* Top Badge with Logo */}
        <div
          className={`${badgeColor ?? "bg-white/30"} rounded-t-[26px] rounded-b-[10px] w-28 h-28 md:w-32 md:h-32 flex items-center justify-center ring-1 ring-white/60 mb-8`}
        >
          <Image
            src={logoPath}
            alt={`${title} logo`}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Title */}
          <h3 className="text-2xl md:text-[26px] font-bold text-white tracking-wide uppercase">
            {title}
          </h3>

          {/* Description */}
          <p className="text-white/95 leading-relaxed max-w-xs">
            {description}
          </p>

          {/* Button */}
          <Link
            href={buttonUrl}
            className={`px-8 py-3 ${buttonColor} text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg`}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
