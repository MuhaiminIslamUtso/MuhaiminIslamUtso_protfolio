import type { Metadata } from "next";
import MainLayout from "@/app/components/layout/MainLayout";
import { skillCategories } from "@/app/data/skills";
import SkillCard from "@/app/components/common/SkillCard";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technologies and tools Muhaimin Islam Utso works with, organized by category.",
};

export default function SkillsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page header */}
        <div className="mb-12">
          <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
            <span aria-hidden="true">{"// "}</span>technical skills
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3FF] mb-4">
            Technologies I Work With
          </h1>
          <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-2xl">
            A collection of languages, frameworks, and tools I use in my academic
            projects and personal learning. Growing steadily with every project.
          </p>
        </div>

        {/* Note about proficiency */}
        <div className="mb-10 p-4 bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-lg">
          <p className="font-mono text-xs text-[#A78BFA]">
            <span aria-hidden="true">$ </span>
            Skills listed reflect genuine exposure and use — no invented proficiency percentages.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {skillCategories.map((category) => (
            <section key={category.id} aria-labelledby={`cat-${category.id}`}>
              <h2
                id={`cat-${category.id}`}
                className="text-xl font-semibold text-[#F5F3FF] mb-1"
              >
                {category.label}
              </h2>
              <div className="w-16 h-px bg-[#8B5CF6] mb-5" aria-hidden="true" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

