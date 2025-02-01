import ModernAbout from "@/components/About";
import ModernCTA from "@/components/Cta";
import ModernHero from "@/components/Hero";
import ModernFeaturedProject from "@/components/Project";
import ModernProjectGrid from "@/components/ProjectGrid";
import ModernTechStack from "@/components/TechStack";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "David Kalina | Full Stack Developer",
  description: "Welcome to my modern portfolio showcasing my work and expertise",
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <ModernHero />

      {/* Tech Stack Section */}
      <ModernTechStack />

      {/* About Section */}
      <ModernAbout />

      <ModernFeaturedProject />

      {/* Projects Section */}
      <ModernProjectGrid />

      {/* Contact Section */}
      <ModernCTA />
    </>
  );
}
