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
    <div className="z-10 -top-50 left-1/2 -translate-x-1/2 bg-black absolute border-5 border-white/20 rounded-2xl shadow-sm max-w-5xl w-full text-center overflow-hidden">
      <div className="relative px-2 sm:px-6 py-6 sm:py-10">

        {/* LiquidEther background - full coverage */}
        <div className="absolute inset-0 z-0 opacity-60">
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Content - allow pointer events to pass through */}
        <div className="relative z-10 pointer-events-none">
          <div
            ref={headerRef}
            className={`story-header text-4xl md:text-6xl font-bold mb-6 text-balance text-center text-white transition-all duration-1000 pointer-events-auto ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <GradientText
              colors={["#F42A41", "#FFD700", "#0085CA", "#FFD700", "#F42A41"]}
              animationSpeed={8}
              showBorder={false}
            >
              <strong>{ourStorySriLankaHeader}</strong>
            </GradientText>
          </div>

          <div ref={paragraphsRef} className="space-y-6">
            {ourStorySriLanka.map((paragraph, idx) => (
              <p
                key={idx}
                className={`story-paragraph text-xl text-gray-300 leading-relaxed text-pretty transition-all duration-1000 delay-${idx * 200} pointer-events-auto ${paragraphsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
