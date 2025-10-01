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
      className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
    >
      <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground leading-relaxed">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
