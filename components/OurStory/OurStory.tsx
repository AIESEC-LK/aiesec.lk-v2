"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ourStorySriLanka,
  ourStorySriLankaHeader,
} from "../../constants/ourStory.constants";

export default function OurStory() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [paragraphsVisible, setParagraphsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if window width is less than 768px for mobile
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

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const paragraphsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setParagraphsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    if (paragraphsRef.current) {
      paragraphsObserver.observe(paragraphsRef.current);
    }

    return () => {
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current);
      }
      if (paragraphsRef.current) {
        paragraphsObserver.unobserve(paragraphsRef.current);
      }
    };
  }, []);

  // Function to highlight special words with colors
  const highlightText = (text: string) => {
    const specialWords = {
      AIESEC: "#037EF3", // AIESEC Blue
      "Sri Lanka": "#F48924", // Sri Lanka Orange
      "30 years": "#F48924", // Orange
      "1,000": "#037EF3", // AIESEC Blue
    };

    let highlightedText = text;
    Object.entries(specialWords).forEach(([word, color]) => {
      const regex = new RegExp(
        `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "gi"
      );
      highlightedText = highlightedText.replace(
        regex,
        `<span style="color: ${color}; font-weight: 500;">${word}</span>`
      );
    });

    return highlightedText;
  };

  return (
    <section
      id="our-story"
      className="relative h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Sri Lanka Map Foreground */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat opacity-30 z-20 pointer-events-none"
        style={{
          backgroundImage: "url('images/ourStory/sri-lanka-outline.webp')",
          backgroundSize: isMobile ? "80%" : "40%",
          backgroundPosition: "center",
        }}
      />

      {/* Subtle Background Elements - matching Hero style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-12 w-40 h-40 bg-yellow-500/10 rounded-full opacity-40 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-12 w-32 h-32 bg-blue-500/10 rounded-full opacity-30 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-500/8 rounded-full opacity-25 blur-2xl animate-float" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-30">
        <div className="relative w-full max-w-6xl mx-auto text-center">
          {/* Content */}
          <div className="relative z-30 px-6 sm:px-8 md:px-12">
            <div
              ref={headerRef}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-8 sm:mb-12 md:mb-16 text-balance text-center leading-[0.9] tracking-tight transition-all duration-1000 animate-fade-in drop-shadow-lg ${
                headerVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="font-extralight text-white">Our</span>{" "}
              <span className="font-semibold" style={{ color: "#037EF3" }}>
                Story
              </span>{" "}
              <span className="font-light text-white">in</span>{" "}
              <span className="font-semibold" style={{ color: "#F48924" }}>
                Sri Lanka
              </span>
            </div>

            <div
              ref={paragraphsRef}
              className="space-y-8 sm:space-y-10 max-w-5xl mx-auto"
            >
              {ourStorySriLanka.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`text-lg sm:text-xl md:text-2xl text-slate-200 leading-relaxed font-light transition-all duration-1000 drop-shadow-lg ${
                    paragraphsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ animationDelay: `${idx * 300}ms` }}
                  dangerouslySetInnerHTML={{
                    __html: highlightText(paragraph),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
