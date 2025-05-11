import ModernAbout from "@/components/About";
import ModernBlog from "@/components/Blog";
import ModernCTA from "@/components/Cta";
import ModernHero from "@/components/Hero";
import ModernFeaturedProject from "@/components/Project";
import ModernProjectGrid from "@/components/ProjectGrid";
import ModernTechStack from "@/components/TechStack";
import type { Metadata } from "next";

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

      <ModernFeaturedProject />

      <ModernProjectGrid />

      <ModernBlog />

      <ModernCTA />
    </>
  );
}
