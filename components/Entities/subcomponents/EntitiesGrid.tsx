import { useEffect, useRef } from "react";
import { EntityCard } from "./EntityCard";

export function EntitiesGrid({
  entities,
}: {
  entities: { name: string; logo: string }[];
}) {
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
        (child as HTMLElement).style.animationDelay = `${index * 0.08}s`;
        observer.observe(child);
      });
    }

    return () => observer.disconnect();
  }, []);
  

  return (
    <div className="w-full flex justify-center">
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 max-w-7xl items-stretch"
      >
        {entities.map((entity, index) => (
          <EntityCard key={index} entity={entity} />
        ))}
      </div>
    </div>
  );
}
