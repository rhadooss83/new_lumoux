export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: "flame-and-fold-burgers",
    title: "Flame & Fold Burgers",
    description: "🔥 Taste the Flame at Flame & Fold! 🍔 Dive into our best sellers and savor the flavor that ignites your cravings. From cheesy delights to spicy thrills, we've got something for everyone! 🚀✨",
    thumbnail: "/burger-store.webp",
    images: [
      "/burger-store.webp",
      "/burger-store-1.webp",
      "/burger-store-2.webp",
      "/burger-store-3.webp",
      "/burger-store-4.webp",
      "/burger-store-5.webp"
    ],
  },
  {
    id: "alpine-serenity-inn",
    title: "Alpine Serenity Inn",
    description: "Leave the city noise behind. Explore our sanctuary✨, featuring exceptional suites and locally sourced culinary experiences, detailed clearly for a frictionless booking journey.🌟",
    thumbnail: "/alpine-serenity-inn.webp",
    images: [
      "/alpine-serenity-inn.webp",
      "/alpine-serenity-inn-1.webp",
      "/alpine-serenity-inn-2.webp",
      "/alpine-serenity-inn-3.webp",
      "/alpine-serenity-inn-4.webp",
      "/alpine-serenity-inn-5.webp"
    ],
  },
  {
    id: "chocoluxe",
    title: "ChocoLuxe",
    description: "Indulge in the rich world of ethically sourced chocolates! 🍫✨ Discover at ChocoLuxe flavors that make a difference and satisfy your sweet tooth responsibly.",
    thumbnail: "/chocoluxe.webp",
    images: [
      "/chocoluxe.webp",
      "/chocoluxe-1.webp",
      "/chocoluxe-2.webp",
      "/chocoluxe-3.webp",
      "/chocoluxe-4.webp",
      "/chocoluxe-5.webp"
    ],
  },
  {
    id: "crypto",
    title: "Crypto",
    description: "🚀 Dive into the future of decentralized finance with Crypto! Explore live markets, secure transactions, and unparalleled support. Ready to take your financial journey to the next level?🔥",
    thumbnail: "/crypto.webp",
    images: [
      "/crypto.webp",
      "/crypto-1.webp",
      "/crypto-2.webp",
      "/crypto-3.webp",
      "/crypto-4.webp",
      "/crypto-5.webp"
    ],
  },
  {
    id: "health-center",
    title: "Health Center",
    description: "Experience healthcare like never before! 🌟 Our team is dedicated to your well-being, making it easy for you to access top-notch services anytime, anywhere. Discover a healthier you with us!🌿✨",
    thumbnail: "/health-center.webp",
    images: [
      "/health-center.webp",
      "/health-center-1.webp",
      "/health-center-2.webp",
      "/health-center-3.webp",
      "/health-center-4.webp",
      "/health-center-5.webp"
    ],
  },
];
