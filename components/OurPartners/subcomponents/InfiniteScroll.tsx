"use client";
import React, { useMemo, Children, useRef, useEffect, useState } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  speed?: number; // Pixels per second
  pauseOnHover?: boolean;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  direction = "right",
  speed = 50, // pixels per second
  pauseOnHover = true,
  className = "",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Convert children to array for proper handling
  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationFrameId: number;
    let currentTranslate = 0;
    const contentWidth = scrollElement.scrollWidth / 2; // Half because we duplicate

    const animate = () => {
      if (!isPaused) {
        if (direction === "right") {
          currentTranslate -= speed / 60; // 60fps
          if (Math.abs(currentTranslate) >= contentWidth) {
            currentTranslate = 0;
          }
        } else if (direction === "left") {
          currentTranslate += speed / 60;
          if (currentTranslate >= 0) {
            currentTranslate = -contentWidth;
          }
        }

        scrollElement.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start with proper initial position for left direction
    if (direction === "left") {
      currentTranslate = -contentWidth;
      scrollElement.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [direction, speed, isPaused]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={scrollRef}
        className="flex gap-6"
        style={{ willChange: "transform" }}
      >
        {/* First set */}
        {childrenArray.map((child, index) => (
          <React.Fragment key={`set1-${index}`}>{child}</React.Fragment>
        ))}
        {/* Duplicate set for seamless loop */}
        {childrenArray.map((child, index) => (
          <React.Fragment key={`set2-${index}`}>{child}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
