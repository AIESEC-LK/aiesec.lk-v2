import React, { useMemo } from "react";
import { globalPartners } from "@/constants/patners";
import GlobalPartnerCard from "./GlobalPartnerCard";
import InfiniteScroll from "@/components/OurPartners/subcomponents/InfiniteScroll";

const GlobalPartners = () => {
  // Split partners into two equal lists - memoized to prevent recalculation
  const { firstList, secondList } = useMemo(() => {
    const midpoint = Math.ceil(globalPartners.length / 2);
    return {
      firstList: globalPartners.slice(0, midpoint),
      secondList: globalPartners.slice(midpoint),
    };
  }, []);

  // Memoize the partner cards to prevent unnecessary re-renders
  const firstRowCards = useMemo(
    () =>
      firstList.map((partner, index) => (
        <div
          key={`first-${partner.name || index}`}
          className="flex-shrink-0 w-48 h-32"
        >
          <GlobalPartnerCard partner={partner} />
        </div>
      )),
    [firstList]
  );

  const secondRowCards = useMemo(
    () =>
      secondList.map((partner, index) => (
        <div
          key={`second-${partner.name || index}`}
          className="flex-shrink-0 w-48 h-32"
        >
          <GlobalPartnerCard partner={partner} />
        </div>
      )),
    [secondList]
  );

  return (
    <div>
      <h3 className="text-2xl font-bold mb-8 text-center text-gray-200">
        Global Affiliations
      </h3>

      {/* Horizontal infinite scroll */}
      <div className="space-y-8">
        {/* First Row - Scroll Right */}
        <InfiniteScroll direction="right" speed={45} pauseOnHover={true}>
          {firstRowCards}
        </InfiniteScroll>

        {/* Second Row - Scroll Left */}
        <InfiniteScroll direction="left" speed={45} pauseOnHover={true}>
          {secondRowCards}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default GlobalPartners;
