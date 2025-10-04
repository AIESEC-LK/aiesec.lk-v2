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
    description: "Make a difference through volunteer projects addressing UN SDG's in 115+ countries",
    buttonText: "Learn More",
    buttonUrl: "https://apply.aiesec.lk",
    logoPath: "/images/exploreOppotunities/logo-1.png",
    backgroundImagePath: "/images/exploreOppotunities/Rectangle 1.png",
    backgroundColor: "from-red-400 to-pink-500",
    buttonColor: "bg-red-600 hover:bg-red-700",
    imageOpacity: 1,
    overlayColor: "bg-red-600/55",
    badgeColor: "bg-red-600/90",
  },
  {
    id: "global-volunteer",
    title: "GLOBAL VOLUNTEER",
    description: "Gain professional experience through international internships with leading companies",
    buttonText: "Learn More",
    buttonUrl: "https://signup.aiesec.lk",
    logoPath: "/images/exploreOppotunities/logo-2.png",
    backgroundImagePath: "/images/exploreOppotunities/Rectangle 2.png",
    backgroundColor: "from-blue-400 to-blue-600",
    buttonColor: "bg-blue-700 hover:bg-blue-800",
    imageOpacity: 1,
    overlayColor: "bg-blue-700/55",
    badgeColor: "bg-blue-700/90",
  },
  {
    id: "global-teacher",
    title: "GLOBAL TEACHER",
    description: "Share your knowledge and culture by teaching abroad in schools and communities",
    buttonText: "Learn More",
    buttonUrl: "https://apply.aiesec.lk",
    logoPath: "/images/exploreOppotunities/logo-3.png",
    backgroundImagePath: "/images/exploreOppotunities/Rectangle 3.png",
    backgroundColor: "from-orange-400 to-amber-600",
    buttonColor: "bg-orange-700 hover:bg-orange-800",
    imageOpacity: 1,
    overlayColor: "bg-amber-700/55",
    badgeColor: "bg-amber-700/90",
  },
];
