"use client";
import React, { useEffect, useRef, useState } from "react";
import LiquidEther from "@/components/LiquidEther";
import GradientText from "@/components/GradientText";
import {
  ourStorySriLanka,
  ourStorySriLankaHeader,
} from "../../../constants/ourStory.constants";

export default function OurStoryCard() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [paragraphsVisible, setParagraphsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative w-full max-w-6xl mx-auto text-center">
      {/* LiquidEther background - full coverage behind content */}
      <div className="absolute inset-0 z-0 opacity-20 rounded-3xl overflow-hidden">
        <LiquidEther
          colors={["#037EF3", "#F48924", "#F85A40"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.2}
          autoIntensity={1.5}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-8 md:px-12">
        <div
          ref={headerRef}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-8 sm:mb-12 md:mb-16 text-balance text-center leading-[0.9] tracking-tight transition-all duration-1000 animate-fade-in ${
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
              className={`text-lg sm:text-xl md:text-2xl text-slate-200 leading-relaxed font-light transition-all duration-1000 ${
                paragraphsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${idx * 300}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
