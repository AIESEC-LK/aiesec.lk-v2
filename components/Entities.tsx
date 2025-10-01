"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  entities,
  entitiesHeader,
  entitiesSubheader,
  entitiesCtaText,
  entitiesCtaLink,
} from "../constants/entities";

export function Entities() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-scale-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      const children = gridRef.current.children;
      Array.from(children).forEach((child, index) => {
        (child as HTMLElement).style.animationDelay = `${index * 0.05}s`;
        observer.observe(child);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="entities" className="py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-light leading-tight text-balance mb-8">
            {entitiesHeader}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light text-pretty">
            {entitiesSubheader}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-8 gap-6 max-w-7xl mx-auto">
          {entities.map((entity, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all group cursor-pointer flex flex-col items-center"
            >
              <div
                className="w-28 h-28 mb-3 flex items-center justify-center rounded-lg p-3"
                style={{ minHeight: 112 }}
              >
                <Image
                  src={entity.logo || "/placeholder.svg"}
                  alt={entity.name}
                  width={96}
                  height={96}
                  className="object-contain max-h-24 max-w-24"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="text-sm text-gray-900 font-normal text-center">
                {entity.name}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-4 font-light">
            {entitiesCtaText}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center text-gray-900 hover:text-gray-600 font-normal text-lg"
          >
            {entitiesCtaLink}
          </a>
        </div>
      </div>
    </section>
  );
}
