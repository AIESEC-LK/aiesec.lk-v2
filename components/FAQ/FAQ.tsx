import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import React from "react";
import { faqs } from "@/constants/faq";
import FAQItem from "./subcomponents/FAQItem";
import GradientText from "../GradientText";

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance flex items-center justify-center gap-2">
            {/* <GradientText
              colors={["#F48924", "#F85A40", "#037EF3", "#F85A40", "#037EF3"]}
              animationSpeed={8}
              showBorder={false}
            >
              <strong>Frequently Asked Questions</strong>
            </GradientText> */}
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance flex items-center justify-center gap-2 text-white">Frequently Asked Questions</h2>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed text-pretty">
            Find answers to common questions about AIESEC and our programs.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
