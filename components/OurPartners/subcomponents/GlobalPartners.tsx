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

  // Render function for partner cards
  const renderPartnerCard = (partner: any, index: number, prefix: string) => (
    <div
      key={`${prefix}-${partner.name || index}`}
      className="flex-shrink-0 w-48 h-32"
    >
      <GlobalPartnerCard partner={partner} />
    </div>
  );

  return (
    <div>
      <h3 className="text-2xl font-bold mb-8 text-center text-gray-200">
        Global Affiliations
      </h3>

      {/* Horizontal infinite scroll */}
      <div className="space-y-8">
        {/* First Row - Scroll Right */}
        <InfiniteScroll direction="right" speed={30} pauseOnHover={true}>
          {firstList.map((partner, index) =>
            renderPartnerCard(partner, index, "first")
          )}
        </InfiniteScroll>

        {/* Second Row - Scroll Left */}
        <InfiniteScroll direction="left" speed={30} pauseOnHover={true}>
          {secondList.map((partner, index) =>
            renderPartnerCard(partner, index, "second")
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default GlobalPartners;
