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

  const getResponsiveEntitySet = () => {
    const screenWidth =
      typeof window !== "undefined" ? window.innerWidth : 1024;
    let colCount;

    if (screenWidth >= 1280) colCount = 8; // xl
    else if (screenWidth >= 1024) colCount = 6; // lg
    else if (screenWidth >= 768) colCount = 4; // md
    else if (screenWidth >= 640) colCount = 3; // sm
    else colCount = 2; // default

    const maxItems = Math.floor(entities.length / colCount) * colCount;
    const remainingCount = entities.length - maxItems;
    const remainingEntitySet = entities.slice(maxItems);

    // Calculate the width percentage for the remaining grid
    const widthPercentage =
      remainingCount > 0 ? (remainingCount / colCount) * 100 : 100;

    return {
      responsiveEntitySet: entities.slice(0, maxItems),
      remainingEntitySet,
      remainingCount,
      mainColCount: colCount,
      remainingGridWidth: `${widthPercentage}%`,
    };
  };

  const {
    responsiveEntitySet,
    remainingEntitySet,
    remainingCount,
    remainingGridWidth,
  } = getResponsiveEntitySet();

  // Generate grid class based on remaining count
  const getGridColsClass = (count: number) => {
    switch (count) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      case 5:
        return "grid-cols-5";
      case 6:
        return "grid-cols-6";
      case 7:
        return "grid-cols-7";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <div className="w-full flex justify-center flex-col">
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 max-w-7xl items-stretch"
      >
        {responsiveEntitySet.map((entity, index) => (
          <EntityCard key={index} entity={entity} />
        ))}
      </div>
      {remainingCount > 0 && (
        <div
          className={`ml-auto mr-auto mt-6 grid ${getGridColsClass(
            remainingCount
          )} gap-6 items-stretch`}
          style={{ width: remainingGridWidth, maxWidth: "1280px" }}
        >
          {remainingEntitySet.map((entity, index) => (
            <EntityCard
              key={responsiveEntitySet.length + index}
              entity={entity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
