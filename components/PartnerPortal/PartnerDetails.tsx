"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { Partner } from "@/types/partner";

interface PartnerDetailsProps {
  partner: Partner;
}

const PartnerDetails = ({ partner }: PartnerDetailsProps) => {
  const [activeVideoModal, setActiveVideoModal] = React.useState(false);
  const [showOpportunitiesModal, setShowOpportunitiesModal] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header with gradient background */}
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,_#F85A40_0%,_#7552CC_40%,_#037EF3_60%,_black_100%)]"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            href="/#partners"
            className="inline-flex items-center justify-center w-10 h-10 text-white hover:text-gray-200 mb-12 mt-4 group transition-all"
            title="Back to Partners"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>

          {/* Partner Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Logo Section */}
            <div className="flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 w-full max-w-md">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-auto object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Info Section */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {partner.name}
              </h1>
              <p className="text-xl text-gray-200 mb-6">{partner.category}</p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {partner.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About the Company */}
            <Section
              title="About the Company"
              content={
                partner.aboutCompany ||
                "Company information coming soon. Please check back later."
              }
            />

            {/* Partner Portal Video */}
            {partner.partnerPortalVideo && (
              <div className="relative">
                <button
                  onClick={() => setActiveVideoModal(true)}
                  className="w-full h-96 bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer relative"
                >
                  <iframe
                    src={partner.partnerPortalVideo}
                    className="w-full h-full"
                    allow="autoplay"
                    title="Partner Portal Video"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                </button>
              </div>
            )}

            {/* Why Partner with AIESEC? */}
            {partner.whyPartner && !partner.whyPartner.includes("coming soon") && (
              <Section
                title="Why Partner with AIESEC?"
                content={
                  partner.whyPartner ||
                  "Information about partnership benefits coming soon."
                }
              />
            )}

            {/* Collaboration in Sri Lanka */}
            {partner.collaboration && !partner.collaboration.includes("coming soon") && (
              <Section
                title="The Collaboration Between {partner.name} and AIESEC in Sri Lanka"
                content={
                  partner.collaboration ||
                  "Collaboration details coming soon. Please check back later."
                }
              />
            )}

            {/* Why Join This Company */}
            {partner.whyJoin && !partner.whyJoin.includes("coming soon") && (
              <Section
                title="Why Should an AIESECer Join?"
                content={
                  partner.whyJoin ||
                  "Details about why AIESECers should join coming soon."
                }
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info Card */}
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-2xl p-6 sticky top-24">
              <h3 className="text-2xl font-bold text-white mb-4">
                Quick Info
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Company Name</p>
                  <p className="text-lg font-semibold text-white">
                    {partner.name}
                  </p>
                </div>

                <div className="border-t border-gray-600/50 pt-4">
                  <p className="text-sm text-gray-400 mb-1">Category</p>
                  <span className="inline-block px-3 py-1 bg-indigo-500/20 border border-indigo-400/50 rounded-full text-sm font-semibold text-indigo-300">
                    {partner.category}
                  </span>
                </div>

                <div className="border-t border-gray-600/50 pt-4">
                  <p className="text-sm text-gray-400 mb-3">
                    Ready to Apply?
                  </p>
                  <button
                    onClick={() => setShowOpportunitiesModal(true)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#037EF3] hover:bg-[#037EF3]/90 text-white font-semibold px-4 py-3 rounded-xl transition-all group"
                  >
                    Explore Opportunities
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-t border-gray-700 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Explore opportunities with {partner.name} through AIESEC and start
              your journey of growth and development.
            </p>
            <button
              onClick={() => setShowOpportunitiesModal(true)}
              className="inline-flex items-center gap-2 bg-[#037EF3] hover:bg-[#037EF3]/90 text-white font-semibold px-8 py-4 rounded-full transition-all group hover:scale-105"
            >
              Explore Opportunities
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Opportunities Modal */}
      {showOpportunitiesModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-b border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">
                Current Opportunities
              </h2>
              <button
                onClick={() => setShowOpportunitiesModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {partner.opportunitiesList && partner.opportunitiesList.length > 0 ? (
                partner.opportunitiesList.map((opportunity, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">
                        {opportunity.title}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-indigo-500/20 border border-indigo-400/50 rounded-full text-sm font-semibold text-indigo-300 whitespace-nowrap ml-4">
                        Deadline: {opportunity.deadline}
                      </span>
                    </div>

                    <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-6">
                      {opportunity.description}
                    </p>

                    {opportunity.applicationLink && (
                      <a
                        href={opportunity.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#037EF3] hover:bg-[#037EF3]/90 text-white font-semibold px-6 py-3 rounded-xl transition-all group"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-300 leading-relaxed text-lg text-center py-8">
                  No opportunities available at the moment. Check back soon!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Section Component
const Section = ({
  title,
  content,
  children,
}: {
  title: string;
  content?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
      {content ? (
        <p className="text-gray-300 leading-relaxed text-lg">{content}</p>
      ) : (
        children
      )}
    </div>
  );
};

export default PartnerDetails;
