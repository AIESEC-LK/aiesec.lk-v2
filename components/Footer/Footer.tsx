import React from "react";
import Link from "next/link";
import { footer } from "@/constants/footer";
import { contactInfo } from "@/constants/contact";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-br from-gray-50 via-white to-gray-50 border-t  border-gray-200"
    >
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col  lg:flex-row justify-between gap-12 mb-12  ">
          {/* Brand Section */}
          <div className="space-y-4   max-w-fit">
            <img
              src="/images/footer/Aiesec-Black-Logo.avif"
              alt="AIESEC"
              className="h-12 w-auto"
            />
            <p className="text-sm text-muted-foreground leading-relaxed" style={{maxWidth: "50.1vh"}}>
              {footer.description}
            </p>
            <div className="flex gap-3 pt-2">
              <Link
                href={contactInfo.socialMedia.facebook}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                target="_blank"
              >
                <FaFacebook className="w-5 h-5" />
              </Link>
              <Link
                href={contactInfo.socialMedia.instagram}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                target="_blank"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link
                href={contactInfo.socialMedia.linkedin}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                target="_blank"
              >
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link
                href={contactInfo.socialMedia.twitter}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                target="_blank"
              >
                <FaXTwitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="  max-w-fit">
            <h3 className="text-base font-bold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footer.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className=" max-w-fit">
            <h3 className="text-base font-bold text-foreground mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start gap-2 group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{contactInfo.email}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start gap-2 group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{contactInfo.phone}</span>
                </Link>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>

          
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Bottom Bar */}
        <div className="pt-8  flex flex-col justify-center items-center  text-sm text-muted-foreground">

          <p className="flex items-center hover:scale-120 transition-transform duration-300 cursor-pointer">{footer.developer}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
