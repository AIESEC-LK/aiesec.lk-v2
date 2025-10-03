import React from "react";
import ContactForm from "./subcomponents/ContactForm";
import ContactInfo from "./subcomponents/ContactInfo";

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/images/contact/NLDS 2022.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/85 to-background/90"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
            Have questions? Want to join or partner with us? We'd love to hear
            from you.
          </p>
        </div>

        <div className="flex max-w-3xl  mx-auto ">
       
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
