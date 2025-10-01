import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
