import type { Metadata } from "next";
import MainLayout from "@/app/components/layout/MainLayout";
import HeroSection from "@/app/components/sections/HeroSection";
import AboutPreview from "@/app/components/sections/AboutPreview";
import FeaturedProjects from "@/app/components/sections/FeaturedProjects";
import SkillsPreview from "@/app/components/sections/SkillsPreview";
import ArcadePreview from "@/app/components/sections/ArcadePreview";
import ContactCTA from "@/app/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "UTSO – Muhaimin Islam Utso | Aspiring Full-Stack Developer",
};

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <AboutPreview />
      <FeaturedProjects />
      <SkillsPreview />
      <ArcadePreview />
      <ContactCTA />
    </MainLayout>
  );
}
