import React from 'react'
import { nationalPartners } from '@/constants/patners'
import { globalPartners } from '@/constants/patners'

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
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
            National Partners
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {nationalPartners.map((partner, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-8 text-center hover:border-primary/50 transition-all hover:scale-105"
              >
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {partner.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {partner.category}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Partners */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
            Global Affiliations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {globalPartners.map((partner, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 flex items-center justify-center hover:border-secondary/50 transition-all"
              >
                <span className="text-sm font-semibold text-muted-foreground text-center">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Interested in partnering with AIESEC?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center text-primary hover:text-primary/80 font-semibold text-lg"
          >
            Partner With Us →
          </a>
        </div>
      </div>
    </section>
  );
}

export default OurPartners
