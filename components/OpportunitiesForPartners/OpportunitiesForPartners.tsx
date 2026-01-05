import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/SpotlightCard";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import { Building2 } from "lucide-react";
import {
  PARTNER_OPPORTUNITIES_HEADER,
  PARTNER_OPPORTUNITIES_DESCRIPTION,
  PARTNER_OPPORTUNITIES,
} from "@/constants/opportunitiesForPartners";
import Link from "next/link";

export function OpportunitiesForPartners() {
  // #037EF3 => rgb(3, 126, 243), use alpha 0.25 for subtle effect
  const spotlightColor = `rgba(3, 126, 243, 0.25)`;
  return (
    <SpotlightWrapper spotlightColor={spotlightColor}>
      <section
        id="partner-opportunities"
        className="  bg-transparent min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/story/sri-lanka-line-image.avif')",
          backgroundSize: "120% auto",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="p-8 md:p-16">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Building2 className="text-gray-900" size={28} />
                </div>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 sm:mb-8 text-center text-slate-800 tracking-tight leading-[0.9]">
                <span className="font-extralight">Opportunities For</span>{" "}
                <span className="font-semibold" style={{ color: "#037EF3" }}>
                  Partners
                </span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed text-center mb-12 font-light max-w-4xl mx-auto">
                {PARTNER_OPPORTUNITIES_DESCRIPTION}
              </p>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {PARTNER_OPPORTUNITIES.map((op, idx) => (
                  <SpotlightCard
                    key={idx}
                    spotlightColor={spotlightColor}
                    className="text-center h-full flex flex-col justify-between rounded-2xl bg-white shadow-sm p-6 "
                  >
                    <div>
                      <div className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
                        {op.title}
                      </div>
                      <div className="text-base md:text-lg text-gray-500 font-normal">
                        {op.description}
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
              <div className="text-center">
                <Link href="/partner-portal">
                  <Button
                    size="lg"
                    variant="default"
                    className="cursor-pointer hover:scale-110 transition-all duration-300 bg-blue-500 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl rounded-lg h-14 px-10 border-2 border-blue-600 hover:border-blue-500 text-xl"
                  >
                    Become a Partner
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SpotlightWrapper>
  );
}
