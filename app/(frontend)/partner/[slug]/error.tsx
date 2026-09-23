"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

// Shown when partner data can't be loaded (e.g. the database is unreachable)
export default function PartnerError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Partner Unavailable
        </h1>
        <p className="text-gray-400 mb-8">
          We couldn&apos;t load this partner right now. Please try again later.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full transition-all"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#037EF3] text-white hover:bg-[#037EF3]/90 font-semibold px-6 py-3 rounded-full transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
