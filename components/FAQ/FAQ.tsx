import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import React from "react";
import { faqs } from "@/constants/faq";
import FAQItem from "./subcomponents/FAQItem";

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-card/30 bg-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
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
