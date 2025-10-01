import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NationalPartners from "./subcomponents/NationalPartners";
import GlobalPartners from "./subcomponents/GlobalPartners";

const OurPartners = () => {
  return (
    <section id="partners" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Our <span className="text-primary">Partners</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
            We collaborate with leading organizations to create meaningful
            opportunities for youth development.
          </p>
        </div>

        {/* National Partners */}
        <NationalPartners />

        {/* Global Partners */}
        <GlobalPartners />

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Interested in partnering with AIESEC?
          </p>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105"
          >
            Partner With Us
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
