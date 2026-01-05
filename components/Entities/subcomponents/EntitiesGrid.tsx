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
            entry.target.classList.add("animate-on-scroll");
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

  // Calculate grid layout for centering last row
  const totalItems = entities.length;
  const mainColCount = 7; // xl:grid-cols-7
  const remainingCount = totalItems % mainColCount;
  const shouldCenterLastRow =
    remainingCount > 0 && remainingCount < mainColCount;

  return (
    <div className="w-full flex justify-center">
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-7xl items-stretch"
      >
        {entities.map((entity, index) => (
          <EntityCard key={index} entity={entity} />
        ))}
      </div>
    </div>
  );
}
