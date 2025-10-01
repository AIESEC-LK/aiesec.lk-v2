import React, { useMemo } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  speed?: number; // Duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  direction = "right",
  speed = 30,
  pauseOnHover = true,
  className = "",
}) => {
  // Memoize animation class to prevent recalculation
  const animationClass = useMemo(() => {
    switch (direction) {
      case "left":
        return "animate-scroll-left";
      case "right":
        return "animate-scroll-right";
      case "up":
        return "animate-scroll-up";
      case "down":
        return "animate-scroll-down";
      default:
        return "animate-scroll-right";
    }
  }, [direction]);

  // Memoize flex direction to prevent recalculation
  const flexDirection = useMemo(() => {
    switch (direction) {
      case "up":
      case "down":
        return "flex-col";
      default:
        return "flex-row";
    }
  }, [direction]);

  // Memoize animation style to prevent object recreation
  const animationStyle = useMemo(
    () => ({
      animationDuration: `${speed}s`,
      willChange: "transform", // Optimize for animations
    }),
    [speed]
  );

  // Memoize duplicated children to prevent unnecessary re-renders
  const duplicatedChildren = useMemo(
    () => (
      <>
        {children}
        {children}
      </>
    ),
    [children]
  );

  return (
    <div className={`group ${className}`}>
      <div
        className={`${animationClass} ${flexDirection} flex gap-6 ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={animationStyle}
      >
        {duplicatedChildren}
      </div>
    </div>
  );
};

export default InfiniteScroll;
