import React from "react";
import { PartnerPopoverProps } from "@/types/partner";


const PartnerPopover = ({ partner, isOpen, onClose }: PartnerPopoverProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for closing */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Popover Card */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-72 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-32 object-contain"
            />
          </div>

          {/* Content */}
          <h3 className="text-lg font-bold text-center mb-2 text-gray-900">
            {partner.name}
          </h3>
          <div className="flex justify-center mb-3">
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-100 text-purple-800`}
            >
              {partner.category}
            </span>
          </div>
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            {partner.description}
          </p>

          {/* Arrow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45"></div>
        </div>
      </div>
    </>
  );
};

export default PartnerPopover;
