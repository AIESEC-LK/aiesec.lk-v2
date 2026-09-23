import React from "react";
import Footer from "@/components/Footer/Footer";
import PartnerHero from "@/components/PartnerPortal/PartnerHero";
import PartnersSection from "@/components/PartnerPortal/PartnersSection";
import Gallery from "@/components/PartnerPortal/Gallery";
import Navigation from "@/components/Navigation/Navigation";
import { getPortalCompanies } from "@/lib/partners";

// Read partners from the database on each request, never during `next build` (CI has no DB)
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Partner Portal - AIESEC in Sri Lanka",
  description: "Explore our partners and opportunities.",
  keywords: "AIESEC, Sri Lanka, Youth, Leadership, Global, Internship, Volunteer, Exchange, Opportunities, Global Talent, Global Volunteer, Partnerships",
  openGraph: {
    title: "Partner Portal - AIESEC in Sri Lanka",
    description: "Explore our partners and opportunities.",
    images: ["/assets/images/bluelogo.png"],
    url: "https://aiesec.lk/partner-portal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner Portal - AIESEC in Sri Lanka",
    description: "Explore our partners and opportunities.",
    images: ["/assets/images/bluelogo.png"],
  },
};

export default async function PartnerPortal() {
  const companies = await getPortalCompanies();

  return (
    <div className="min-h-screen">
      <Navigation />
      <PartnerHero />
      <PartnersSection companies={companies} />
      <Gallery />
      <Footer />
    </div>
  );
}
