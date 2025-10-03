import {
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { FAQItemProps } from "@/types/faq";
import React from "react";

const FAQItem = ({ faq, index }: FAQItemProps) => {
  return (
    <AccordionItem
      value={`item-${index}`}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 shadow-lg data-[state=open]:border-primary/50"
    >
      <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-white hover:no-underline cursor-pointer">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 leading-relaxed">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
