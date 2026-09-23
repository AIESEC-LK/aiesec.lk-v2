"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Partner {
  id: number;
  name: string;
  logo: string;
  category: string;
  description: string;
  link: string;
  isInternal?: boolean;
}

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const CardContent = (
    <div className="relative w-64 h-72 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-100 overflow-hidden">
      
      {/* Image Section */}
      <div className="h-48 p-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300">
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 h-24 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-center text-gray-900 group-hover:text-[#037EF3] transition-colors duration-300">
          {partner.name}
        </h3>
        
        {/* Category Badge */}
        <div className="mt-2 flex justify-center">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            partner.category === "National Talent Partner" 
              ? "bg-emerald-100 text-emerald-800" 
              : "bg-blue-100 text-blue-800"
          }`}>
            {partner.category}
          </span>
        </div>
      </div>

      {/* Hover Description Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
        <div className="text-white text-center p-6">
          <h4 className="text-lg font-semibold mb-2">{partner.name}</h4>
          <p className="text-sm text-gray-200 leading-relaxed">
            {partner.description}
          </p>
          <div className="mt-4 inline-flex items-center text-sm text-blue-300 font-medium">
            {partner.isInternal ? "Explore Opportunities →" : "Learn More →"}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="group"
    >
      {partner.isInternal ? (
        <Link href={partner.link} className="block">
          {CardContent}
        </Link>
      ) : (
        <a href={partner.link} target="_blank" rel="noopener noreferrer" className="block">
          {CardContent}
        </a>
      )}
    </motion.div>
  );
};

export default PartnerCard;
