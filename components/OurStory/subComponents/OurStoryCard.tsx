"use client";
import LiquidEther from "@/components/LiquidEther";
import {
  ourStorySriLanka,
  ourStorySriLankaHeader,
} from "../../../constants/ourStory.constants";

export default function OurStoryCard() {
  return (
    <div className="relative border border-muted rounded-2xl bg-background/80 shadow-sm px-2 sm:px-6 py-6 sm:py-10 max-w-5xl w-full mx-auto text-center mb-16 overflow-hidden">
      {/* LiquidEther as background */}
      <div className="absolute inset-0 w-full h-full z-11 opacity-40">
        <LiquidEther
          colors={["#0CB9C1", "#7552CC", "#037EF3"]}
          mouseForce={15}
          cursorSize={120}
          isViscous={false}
          viscous={10}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={true}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={0.8}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {/* Content above background */}
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          {ourStorySriLankaHeader}
        </h2>
        <div className="space-y-6">
          {ourStorySriLanka.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-xl text-muted-foreground leading-relaxed text-pretty"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
