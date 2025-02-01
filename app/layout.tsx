import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ModernFooter from "@/components/Footer";
import ModernNavbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Modern Portfolio",
  description: "A modern portfolio built with Next.js",
  openGraph: {
    title: "Modern Portfolio",
    description: "A modern portfolio built with Next.js",
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <AnimatedBackground />
        <ModernNavbar />
        <main className="flex-1">{children}</main>
        <ModernFooter />
      </body>
    </html>
  );
}
