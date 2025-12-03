export const exploreOpportunitiesHeader = "Explore Opportunities";

export const exploreOpportunitiesSubheader =
  "Whether you're a student seeking global experiences or a company looking for international talent, AIESEC has opportunities for you.";

export interface OpportunityItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  logoPath: string;
  backgroundImagePath: string;
  backgroundColor: string;
  buttonColor: string;
  imageOpacity?: number;
  overlayColor?: string;
  badgeColor?: string;
}

export const opportunities: OpportunityItem[] = [
  {
    id: "global-talent",
    title: "GLOBAL TALENT",
    description:
      "Gain professional experience through international internships with leading companies",
    buttonText: "Sign Up",
    buttonUrl: "https://apply.aiesec.lk",
    logoPath: "/images/exploreOppotunities/logo-1.png",
    backgroundImagePath: "/images/exploreOppotunities/Rectangle 1.png",
    backgroundColor: "from-[#0CB9C1] to-[#0CA8AF]",
    buttonColor: "bg-[#0CB9C1] hover:bg-[#0AA5AD]",
    imageOpacity: 1,
    overlayColor: "bg-[#0CB9C1]/55",
    badgeColor: "bg-[#0CB9C1]",
  },
  {
    id: "global-volunteer",
    title: "GLOBAL VOLUNTEER",
    description:
      "Make a difference through volunteer projects addressing UN SDG's in 115+ countries",
    buttonText: "Sign Up",
    buttonUrl: "https://signup.aiesec.lk",
    logoPath: "/images/exploreOppotunities/logo-2.png",
    backgroundImagePath: "/images/exploreOppotunities/Rectangle 2.png",
    backgroundColor: "from-[#F85A40] to-[#E6523A]",
    buttonColor: "bg-[#F85A40] hover:bg-[#E04A34]",
    imageOpacity: 1,
    overlayColor: "bg-[#F85A40]/55",
    badgeColor: "bg-[#F85A40]",
  },
  {
    id: "global-teacher",
    title: "GLOBAL TEACHER",
    description:
      "Share your knowledge and culture by teaching abroad in schools and communities",
    buttonText: "Sign Up",
    buttonUrl: "https://apply.aiesec.lk",
    logoPath: "/images/exploreOppotunities/logo-3.png",
    backgroundImagePath: "/images/exploreOppotunities/Rectangle 3.png",
    backgroundColor: "from-[#F48924] to-[#E07B1F]",
    buttonColor: "bg-[#F48924] hover:bg-[#DC7D1E]",
    imageOpacity: 1,
    overlayColor: "bg-[#F48924]/55",
    badgeColor: "bg-[#F48924]",
  },
];
