"use client";

import { useEffect, useState } from "react";
import { heroConstants } from "@/constants/hero";
import {
  BackgroundVideo,
  HeroLogo,
  HeroHeading,
  HeroStats,
  ScrollIndicator,
  DecorativeElements,
} from "./subcomponents";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Check if window width is less than 768px
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lazy load video when component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            setShouldLoadVideo(true);
          }
        });
      },
      { threshold: heroConstants.animations.intersectionThreshold }
    );

    // Create a ref to the section element for video lazy loading
    const currentSection = document.getElementById("home");
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <BackgroundVideo isMobile={isMobile} shouldLoadVideo={shouldLoadVideo} />
      <DecorativeElements />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-10 md:space-y-12 animate-fade-in">
          <HeroLogo />
          <HeroHeading />
          <HeroStats />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
