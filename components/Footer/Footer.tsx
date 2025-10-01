import React from "react";
import Link from "next/link";
import { footer } from "@/constants/footer";

const Footer = () => {
  return (
    <section id="footer">
      <div className="p-16 pb-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <img
                src="/images/footer/Aiesec-Black-Logo.avif"
                alt="AIESEC"
                className="h-10 w-auto mb-2"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {footer.description}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {footer.links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
          <p>{footer.rights}</p>
          <p>{footer.developer}</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
