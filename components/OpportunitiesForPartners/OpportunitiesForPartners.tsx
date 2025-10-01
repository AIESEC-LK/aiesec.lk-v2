import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import {
  PARTNER_OPPORTUNITIES_HEADER,
  PARTNER_OPPORTUNITIES_DESCRIPTION,
  PARTNER_OPPORTUNITIES,
} from "@/constants/opportunitiesForPartners";

export function OpportunitiesForPartners() {
  return (
    <section id="partner-opportunities" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl p-8 md:p-16 shadow-sm bg-white">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Building2 className="text-gray-900" size={28} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-center text-gray-900 tracking-tight">
            {PARTNER_OPPORTUNITIES_HEADER}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center mb-12 font-normal max-w-3xl mx-auto">
            {PARTNER_OPPORTUNITIES_DESCRIPTION}
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {PARTNER_OPPORTUNITIES.map((op, idx) => (
              <Card
                key={idx}
                className="text-center h-full flex flex-col justify-between"
              >
                <CardHeader>
                  <CardTitle className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
                    {op.title}
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg text-gray-500 font-normal">
                    {op.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-white rounded-lg h-12 px-8 font-normal"
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
