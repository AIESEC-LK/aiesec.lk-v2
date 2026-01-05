"use client";

import { useRef, useEffect } from "react";
import { heroConstants } from "@/constants/hero";

interface BackgroundVideoProps {
  isMobile: boolean;
  shouldLoadVideo: boolean;
}

export function BackgroundVideo({
  isMobile,
  shouldLoadVideo,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = (videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
      videoElement.play().catch(() => {
        // Handle autoplay failure silently
      });
    }
  };

  return (
    <>
      {/* Youthful AIESEC Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-50"></div>
      <div className="absolute inset-0 w-full h-full">
        {/* Desktop Video */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${
              isMobile ? "hidden" : "block"
            }`}
            style={{
              width: "100vw",
              height: "150vh",
              transform: "scale(1.8)",
              opacity: 0.3,
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => handleVideoLoad(videoRef.current)}
          >
            <source src={heroConstants.videos.desktop} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Mobile Video */}
        {shouldLoadVideo && (
          <video
            ref={mobileVideoRef}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${
              isMobile ? "block" : "hidden"
            }`}
            style={{
              width: "100vw",
              height: "150vh",
              transform: "scale(2)",
              opacity: 0.3,
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => handleVideoLoad(mobileVideoRef.current)}
          >
            <source src={heroConstants.videos.mobile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-slate-50/10 to-blue-50/20" />
      </div>
    </>
  );
}
