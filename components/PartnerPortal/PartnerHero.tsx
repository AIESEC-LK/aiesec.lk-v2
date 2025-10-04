"use client";
import React from "react";
import Link from "next/link";

const PartnerHero = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/partnerPortal/PartnerPortalBG.jpg')",
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center text-center">
        <div className="text-white px-8 max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Partner Portal
          </h1>
          
          {/* Decorative Underline */}
          <div className="flex justify-center mb-16">
            <svg width="300" height="20" viewBox="0 0 300 20" className="text-white">
              <path
                d="M2 10c49.7 2.6 100 3.1 150 1.7-46.5 2-93 4.4-139.2 7.3 45.2-1.5 90.6-1.8 135.8-.6"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Subtitle */}
          <h4 className="text-xl lg:text-2xl font-light mb-12 leading-relaxed">
            Hey there! Welcome to the Partner Portal,<br />
            Your one-stop hub for growth opportunities tailored for you from our partners.
          </h4>

          {/* Call to Action */}
          <div className="mb-8">
            <h5 className="text-lg text-white mb-6 max-w-2xl mx-auto">
              Discover, connect and grow with AIESEC, where extraordinary journeys begin.
            </h5>
            
            {/* Scroll Down Arrow */}
            <Link href="#partners" className="inline-block animate-bounce">
              <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerHero;
