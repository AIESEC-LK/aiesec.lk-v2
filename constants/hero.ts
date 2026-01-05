export const heroConstants = {
  // Carousel words and their corresponding colors
  leadershipWords: [
    "Youth Leadership",
    "Global Impact",
    "Social Innovation",
    "Global Peace",
    "Future Leaders",
  ],

  wordColors: [
    "#037EF3", // Youth Leadership - AIESEC Blue
    "#F48924", // Global Impact - Orange
    "#F85A40", // Social Innovation - Red/Orange
    "#0CB9C1", // Global Peace - Teal
    "#00c16e", // Future Leaders - Green
  ],

  // Main heading text
  heading: {
    prefix: "Developing",
    suffix: "For Tomorrow",
  },

  // Logo configuration
  logo: {
    src: "/images/hero/30 Years Logo.png",
    alt: "AIESEC Sri Lanka 30 Years",
    width: 120,
    height: 60,
  },

  // Statistics data
  stats: [
    {
      value: "1800+",
      label: "Active Members",
    },
    {
      value: "22+",
      label: "Universities",
    },
    {
      value: "1500+",
      label: "Global Exchanges",
    },
    {
      value: "30+",
      label: "Years of Impact",
    },
  ],

  // Video configuration
  videos: {
    desktop: "/videos/desktop.mp4",
    mobile: "/videos/mobile.mp4",
  },

  // Animation timings
  animations: {
    carouselInterval: 3000, // 3 seconds
    transitionDuration: 1000, // 1 second
    intersectionThreshold: 0.1,
  },
} as const;
