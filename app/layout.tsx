import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AIESEC in Sri Lanka | Youth Leadership & Global Opportunities",
  description:
    "Celebrating 30 years of developing youth leadership in Sri Lanka. Join AIESEC for global volunteer, talent, and teaching opportunities. Empowering young people since 1995.",
  keywords:
    "AIESEC Sri Lanka, youth leadership, global volunteer Sri Lanka, foreign talent Sri Lanka, youth volunteering Sri Lanka, international internships, student exchange programs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${poppins.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
