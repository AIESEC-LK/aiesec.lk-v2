"use client";

import { useState, useEffect } from "react";
import GradientText from "@/components/GradientText";
import { heroConstants } from "@/constants/hero";

export function TextCarousel() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Create extended array with duplicate first item at the end for seamless loop
  const extendedWords = [
    ...heroConstants.leadershipWords,
    heroConstants.leadershipWords[0],
  ];
  const extendedColors = [
    ...heroConstants.wordColors,
    heroConstants.wordColors[0],
  ];

  // Carousel effect for leadership words with seamless loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        // If we've reached the duplicated first item (last position)
        if (nextIndex === extendedWords.length - 1) {
          // Move to the duplicate, then jump back to start after transition
          setTimeout(() => {
            setCurrentWordIndex(0);
          }, heroConstants.animations.transitionDuration); // Wait for transition to complete
          return nextIndex;
        }

        return nextIndex;
      });
    }, heroConstants.animations.carouselInterval);

    return () => clearInterval(interval);
  }, [extendedWords.length]);

  return (
    <div className="relative h-24 sm:h-28 md:h-24 lg:h-28 xl:h-32 2xl:h-36 overflow-hidden my-5 sm:my-6">
      <div
        className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
          currentWordIndex === 0 ? "transition-none" : ""
        }`}
        style={{
          transform: `translateY(-${currentWordIndex * 100}%)`,
        }}
      >
        {extendedWords.map((word, index) => (
          <div
            key={index}
            className="h-24 sm:h-28 md:h-24 lg:h-28 xl:h-32 2xl:h-36 flex items-center justify-center px-2"
          >
            <GradientText
              colors={[extendedColors[index], extendedColors[index]]}
              animationSpeed={6}
            >
              <span className="font-semibold text-5xl sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-center">
                {word}
              </span>
            </GradientText>
          </div>
        ))}
      </div>
    </div>
  );
}
