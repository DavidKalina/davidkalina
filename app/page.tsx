import ModernAbout from "@/components/About";
import ModernCTA from "@/components/Cta";
import ModernHero from "@/components/Hero";
import ModernProjectGrid from "@/components/ProjectGrid";
import ModernTechStack from "@/components/TechStack";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "David Kalina | Full Stack Developer",
  description: "Welcome to my portfolio showcasing my work and expertise",
};

export default function Home() {
  return (
    <>
      <ModernHero />

      <ModernTechStack />

      <ModernAbout />

      <ModernProjectGrid />

      <ModernCTA />
    </>
  );
}
