import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { SocialMediaProps } from "@/types/contact";

const SocialMedia = ({ socialMedia }: SocialMediaProps) => {
  const socialLinks = [
    { href: socialMedia.facebook, icon: FaFacebook, label: "Facebook" },
    { href: socialMedia.instagram, icon: FaInstagram, label: "Instagram" },
    { href: socialMedia.linkedin, icon: FaLinkedin, label: "LinkedIn" },
    { href: socialMedia.twitter, icon: FaXTwitter, label: "Twitter/X" },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-foreground">Follow Us</h3>
      <div className="flex gap-4">
        {socialLinks.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border w-12 h-12 rounded-full flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
          >
            <social.icon className="text-foreground" size={20} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
