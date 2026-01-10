import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { nationalPartners, globalPartners } from "@/constants/patners";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import PartnerDetails from "@/components/PartnerPortal/PartnerDetails";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PartnerPage({ params }: Props) {
  const { slug } = await params;
  
  // Get partner from both national and global partners
  const partner =
    nationalPartners.find((p) => p.slug === slug) ||
    globalPartners.find((p) => p.slug === slug);

  if (!partner) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Partner Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            The partner you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#037EF3] text-white hover:bg-[#037EF3]/90 font-semibold px-6 py-3 rounded-full transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <PartnerDetails partner={partner} />
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  const allPartners = [...nationalPartners, ...globalPartners];
  return allPartners
    .filter((partner) => partner.slug) // Only include partners with a slug
    .map((partner) => ({
      slug: partner.slug as string,
    }));
}

export function generateMetadata({ params }: Props) {
  return {
    title: `Partner | AIESEC in Sri Lanka`,
    description: "Partner details page",
  };
}
