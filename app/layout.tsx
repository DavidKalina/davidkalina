import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import ModernFooter from "@/components/Footer";
import ModernNavbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/context/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-mono",
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
      <body
        className={`${spaceMono.variable} font-mono antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider defaultTheme="dark" storageKey="dk-theme">
          <AnimatedBackground />
          <ModernNavbar />
          <main className="flex-1">{children}</main>
          <Analytics />
          <SpeedInsights />
          <ModernFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
