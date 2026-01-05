"use client";

import { useRef, useEffect } from "react";
import { heroConstants } from "@/constants/hero";

export function HeroStats() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-on-scroll");
          }
        });
      },
      { threshold: heroConstants.animations.intersectionThreshold }
    );

    if (statsRef.current) {
      const children = statsRef.current.children;
      Array.from(children).forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={statsRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-10 sm:pt-12 md:pt-16 max-w-5xl mx-auto"
    >
      {heroConstants.stats.map((stat, index) => (
        <div
          key={index}
          className="space-y-2 sm:space-y-3 p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light"
            style={{ color: "#037EF3" }}
          >
            {stat.value}
          </div>
          <div className="text-sm sm:text-base text-slate-600 font-medium leading-tight">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
