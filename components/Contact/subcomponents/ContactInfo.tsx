import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import SocialMedia from "./SocialMedia";
import { contactInfo } from "@/constants/contact";

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-6 text-foreground">
          Contact Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/30 shadow-lg">
              <Mail className="text-primary" size={20} />
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1">Email</div>
              <Link
                href={`mailto:${contactInfo.email}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {contactInfo.email}
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/30 shadow-lg">
              <Phone className="text-primary" size={20} />
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1">Phone</div>
              <Link
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {contactInfo.phone}
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/30 shadow-lg">
              <MapPin className="text-primary" size={20} />
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1">Address</div>
              <p className="text-muted-foreground">{contactInfo.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <SocialMedia socialMedia={contactInfo.socialMedia} />
    </div>
  );
};

export default ContactInfo;
