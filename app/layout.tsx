import AnimatedBackground from "@/components/AnimatedBackground.";
import ExcalidrawFooter from "@/components/ExcalidrawFooter";
import ExcalidrawNavbar from "@/components/ExcalidrawNavbar";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google"; // Changed from Geist
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"], // Include the weights you need
});

export const metadata: Metadata = {
  title: "David Kalina",
  description: "Full Stack Developer",
  openGraph: {
    title: "David Kalina",
    description: "Full Stack Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <AnimatedBackground />
        <ExcalidrawNavbar />
        <main className="flex-1">{children}</main>
        <Analytics />
        <ExcalidrawFooter />
      </body>
    </html>
  );
}
