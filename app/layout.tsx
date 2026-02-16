import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import "prismjs/themes/prism-tomorrow.css";
import ModernFooter from "@/components/Footer";
import ModernNavbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground.";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/context/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
    <html lang="en" className={`scroll-smooth`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider defaultTheme="dark">
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
