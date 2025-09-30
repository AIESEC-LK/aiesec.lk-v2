"use client";
import React, { useEffect, useRef, useState } from "react";
import { NationalPartnerCardProps } from "@/types/partner";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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
    <Card className="max-w-xs pt-0">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <CardContent className="px-0">
        <div
          className="relative w-full h-52 rounded-t-xl overflow-hidden"
          style={gradientStyle}
        >
          {/* Blurred background image */}
          <img
            ref={imageRef}
            src={partner.logo}
            className="absolute inset-0 w-full h-full object-cover filter blur-xl brightness-150 opacity-20"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10"></div>
          {/* Main image - 60% height */}
          <div className="relative h-full flex items-center justify-center p-4">
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-auto object-contain drop-shadow-lg"
              style={{ maxHeight: "60%" }}
            />
          </div>
        </div>
      </CardContent>
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-bold">{partner.name}</CardTitle>
        <CardDescription>{partner.description}</CardDescription>
      </CardHeader>
      <CardFooter className="gap-3 max-sm:flex-col max-sm:items-stretch">
        <div className="w-full flex justify-center">
          <span
            className={`text-sm font-medium px-2 py-1 rounded ${
              partner.category === "National Partner"
                ? "bg-amber-100 text-amber-800"
                : partner.category === "National Talent Partner"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {partner.category}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NationalPartnerCard;
