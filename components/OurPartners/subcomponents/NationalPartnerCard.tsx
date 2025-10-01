"use client";
import React, { useEffect, useRef, useState } from "react";
import { NationalPartnerCardProps } from "@/types/partner";
const NationalPartnerCard = ({ partner }: NationalPartnerCardProps) => {
  const [colors, setColors] = useState<string[]>([
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const extractColors = (image: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to image size
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    // Draw image to canvas
    ctx.drawImage(image, 0, 0);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Sample colors from the image
    const colorCounts: { [key: string]: number } = {};
    const step = Math.max(1, Math.floor(data.length / 4 / 1000)); // Sample every nth pixel

    for (let i = 0; i < data.length; i += step * 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Skip transparent pixels
      if (a < 128) continue;

      // Skip very dark or very light colors
      const brightness = (r + g + b) / 3;
      if (brightness < 30 || brightness > 225) continue;

      const color = `rgb(${r}, ${g}, ${b})`;
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    }

    // Get the most common colors
    const sortedColors = Object.entries(colorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([color]) => color);

    if (sortedColors.length > 0) {
      setColors(sortedColors);
    }
  };

  useEffect(() => {
    const image = imageRef.current;
    if (image && image.complete) {
      extractColors(image);
    } else if (image) {
      image.onload = () => extractColors(image);
    }
  }, [partner.logo]);

  const gradientStyle = {
    background: `linear-gradient(135deg, ${colors[0]}20, ${colors[1]}20, ${colors[2]}20)`,
  };

  return (
    <div className="max-w-xs group cursor-pointer mx-auto">
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Card Container - Fixed size */}
      <div className="relative bg-white rounded-2xl border border-gray-200 transition-shadow duration-500 ease-in-out overflow-hidden h-96 flex flex-col">
        {/* Image Section - Height changes on hover - SHRINKS on hover */}
        <div
          className="relative w-full h-64 group-hover:h-48 rounded-t-2xl overflow-visible transition-all duration-500 ease-in-out"
          style={gradientStyle}
        >
          {/* Blurred background */}
          <img
            ref={imageRef}
            src={partner.logo}
            className="absolute inset-0 w-full h-full object-cover filter blur-xl brightness-150 opacity-20"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10"></div>

          {/* Main image */}
          <div className="relative h-full flex items-center justify-center p-6">
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-auto object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 ease-out"
              style={{ maxHeight: "60%" }}
            />
          </div>

          {/* Convex curve overlay (bulging outward) */}
          <div
            className="absolute -bottom-1 left-0 right-0 h-8 bg-white group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
            style={{
              borderTopLeftRadius: "50% 100%",
              borderTopRightRadius: "50% 100%",
            }}
          ></div>
        </div>

        {/* Content Section - Fills remaining space */}
        <div className="relative bg-white flex-1 px-6 py-4 flex flex-col justify-between">
          {/* Title - always visible */}
          <h3 className="text-xl font-bold text-center mb-2 group-hover:text-primary group-hover:scale-105 transition-all duration-300">
            {partner.name}
          </h3>

          {/* Description - fades in on hover */}
          <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <p className="text-sm text-center text-muted-foreground group-hover:text-primary/70 mb-3 transition-colors duration-300">
              {partner.description}
            </p>
          </div>

          {/* Category Badge */}
          <div className="flex justify-center">
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full group-hover:scale-110 transition-all duration-300 ${
                partner.category === "National Partner"
                  ? "bg-amber-100 text-amber-800 group-hover:bg-amber-200 group-hover:shadow-md"
                  : partner.category === "National Talent Partner"
                  ? "bg-green-100 text-green-800 group-hover:bg-green-200 group-hover:shadow-md"
                  : "bg-gray-100 text-gray-800 group-hover:bg-gray-200 group-hover:shadow-md"
              }`}
            >
              {partner.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalPartnerCard;
